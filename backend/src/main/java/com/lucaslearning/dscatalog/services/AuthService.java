package com.lucaslearning.dscatalog.services;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lucaslearning.dscatalog.dto.EmailDTO;
import com.lucaslearning.dscatalog.dto.NewPasswordDTO;
import com.lucaslearning.dscatalog.entities.PasswordRecover;
import com.lucaslearning.dscatalog.entities.User;
import com.lucaslearning.dscatalog.repositories.PasswordRecoverRepository;
import com.lucaslearning.dscatalog.repositories.UserRepository;
import com.lucaslearning.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class AuthService {

	@Value("${email.password-recover.token.minutes}")
	private Long tokenMinutes;

	@Value("${email.password-recover.uri}")
	private String recoverUri;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordRecoverRepository passwordRecoverRepository;

	@Autowired
	private EmailService emailService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Transactional
	public void createRecoverToken(EmailDTO dto) {
		User user = userRepository.findByEmail(dto.getEmail());

		if (user == null) {
			throw new ResourceNotFoundException("Email não encontrado");
		}

		String token = UUID.randomUUID().toString();

		PasswordRecover entity = new PasswordRecover();
		entity.setEmail(dto.getEmail());
		entity.setToken(token);
		entity.setExpiration(Instant.now().plusSeconds(tokenMinutes * 60L));

		entity = passwordRecoverRepository.save(entity);

		String body = "Acesse o link para definir uma nova senha\n\n" + recoverUri + token;

		emailService.sendEmail(dto.getEmail(), "Recuperação de senha", body);
	}

	@Transactional
	public void saveNewPassword(NewPasswordDTO dto) {
		List<PasswordRecover> result = passwordRecoverRepository.searchValidTokens(dto.getToken(), Instant.now());

		if (result.size() == 0) {
			throw new ResourceNotFoundException("Token inválido");
		}

		User user = userRepository.findByEmail(result.get(0).getEmail());
		user.setPassword(passwordEncoder.encode(dto.getPassword()));

		userRepository.save(user);
	}

	protected User authenticated() {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String username = authentication.getPrincipal().toString();
			return userRepository.findByEmail(username);
		} catch (Exception e) {
			throw new UsernameNotFoundException("Invalid user");
		}
	}

}
