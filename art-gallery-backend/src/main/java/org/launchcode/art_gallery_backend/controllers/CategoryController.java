package org.launchcode.art_gallery_backend.controllers;

import org.launchcode.art_gallery_backend.models.Category;
import org.launchcode.art_gallery_backend.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    // Retrieve all categories from database
    // GET http://localhost:8080/api/categories
    @GetMapping("")
    public ResponseEntity<?> getAllCategories() {
        List<Category> allCategories = categoryRepository.findAll();
        return new ResponseEntity<>(allCategories, HttpStatus.OK); // 200
    }

    // Save new category to database
    // POST http://localhost:8080/api/categories/add
    @PostMapping("/add")
    public ResponseEntity<?> addNewCategory(@RequestBody Category category) {
        categoryRepository.save(category);
        return new ResponseEntity<>(category, HttpStatus.CREATED); // 201
    }

    // Delete an existing category from the database
    // DELETE http://localhost:8080/api/categories/delete/2 (for example)
    @DeleteMapping(value="/delete/{categoryId}", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteCategory(@PathVariable int categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category == null) {
            String response = "Artist with ID of " + categoryId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        } else {
            categoryRepository.deleteById(categoryId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
        }
    }
}
