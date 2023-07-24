package com.lucaslearning.dscatalog.tests.factory;

import com.lucaslearning.dscatalog.dto.CategoryDTO;
import com.lucaslearning.dscatalog.entities.Category;

public class CategoryFactory {

	public static Category createCategory() {
		return new Category(1L, "Livros");
	}
	
	public static CategoryDTO createCategoryDTO() {
		return new CategoryDTO(createCategory());
	}
	
}
