package com.lucaslearning.dscatalog.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class EmailDTO {

	@NotBlank(message = "Campo obrigatório")
	@Email(message = "Email inválido")
	private String email;

	public EmailDTO() {

	}

	public EmailDTO(String email) {
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
