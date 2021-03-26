package com.lucaslearning.dscatalog.services.exceptions;

public class ObjectNotFoundExcpetion extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public ObjectNotFoundExcpetion(String msg) {
		super(msg);
	}
}
