package com.lucaslearning.dscatalog.tests.factory;

import com.lucaslearning.dscatalog.dto.ProductDTO;
import com.lucaslearning.dscatalog.entities.Category;
import com.lucaslearning.dscatalog.entities.Product;

public class ProductFactory {

	public static Product createProduct() {
		Product product = new Product(1L, "Phone", "Good Phone", 800.0, "https://img.com/img.png", java.time.Instant.parse("2022-10-20T03:00:00Z"));
		product.getCategories().add(new Category(1L, "Livros"));
		
		return product;
	}
	
	public static ProductDTO createProductDTO() {
		Product product = createProduct();
		return new ProductDTO(product, product.getCategories());
	}
	
	public static ProductDTO createProductDTO(Long id) {
		ProductDTO dto = createProductDTO();
		dto.setId(id);
		
		return dto;
	}
	
}
