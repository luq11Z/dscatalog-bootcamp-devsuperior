package com.lucaslearning.dscatalog.services.exceptions;

public class ResourceNotFoundExcpetion extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public ResourceNotFoundExcpetion(String msg) {
		super(msg);
	}
}
