package org.launchcode.art_gallery_spring_java_back_end.controllers;

import org.launchcode.art_gallery_spring_java_back_end.models.Category;
import org.launchcode.art_gallery_spring_java_back_end.models.dto.CategoryDTO;
import org.launchcode.art_gallery_spring_java_back_end.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    // GET the full list of categories
    // Endpoint is http://localhost:8080/api/categories
    @GetMapping("")
    public ResponseEntity<?> getAllCategories() {
        List<Category> allCategories = categoryRepository.findAll();
        return new ResponseEntity<>(allCategories, HttpStatus.OK); // 200
    }

    // POST a new category
    // Endpoint http://localhost:8080/api/categories/add?title=Impressionism (for example)
    @PostMapping("/add")
    public ResponseEntity<?> createNewCategory(@RequestBody CategoryDTO categoryData) {
        Category newCategory = new Category(categoryData.getTitle());
        categoryRepository.save(newCategory);
        return new ResponseEntity<>(newCategory, HttpStatus.CREATED); // 201
    }
}
