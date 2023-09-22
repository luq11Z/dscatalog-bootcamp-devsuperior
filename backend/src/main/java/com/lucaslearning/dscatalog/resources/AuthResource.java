package com.lucaslearning.dscatalog.resources;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucaslearning.dscatalog.dto.EmailDTO;
import com.lucaslearning.dscatalog.dto.NewPasswordDTO;
import com.lucaslearning.dscatalog.services.AuthService;

@RestController
@RequestMapping(value = "/auth")
public class AuthResource {

	@Autowired
	private AuthService service;
	
	@PostMapping(value = "recover-token")
	public ResponseEntity<Void> createRecoverToken(@Valid @RequestBody EmailDTO dto) {
		service.createRecoverToken(dto);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "new-password")
	public ResponseEntity<Void> saveNewPassword(@Valid @RequestBody NewPasswordDTO dto) {
		service.saveNewPassword(dto);
		return ResponseEntity.noContent().build();
	}

} 
