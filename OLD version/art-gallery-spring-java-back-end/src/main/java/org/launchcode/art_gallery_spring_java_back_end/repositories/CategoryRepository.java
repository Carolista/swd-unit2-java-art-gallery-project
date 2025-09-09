package org.launchcode.art_gallery_spring_java_back_end.repositories;

import org.launchcode.art_gallery_spring_java_back_end.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
