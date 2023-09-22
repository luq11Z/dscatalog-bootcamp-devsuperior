package com.lucaslearning.dscatalog.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class NewPasswordDTO {

	private String token;
	
	@NotBlank(message = "Campo obrigatório")
	@Size(min = 8, message = "Deve ter no mínimo 8 caracteres")
	private String password;

	public NewPasswordDTO() {

	}
	
	public NewPasswordDTO(String token, String password) {
		this.token = token;
		this.password = password;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
}
