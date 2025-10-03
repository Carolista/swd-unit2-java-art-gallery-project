package org.launchcode.art_gallery_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CategoryDTO {

    @NotBlank(message = "Category is required.")
    @Size(min = 1, max = 40, message = "Category must be 1-40 characters long.")
    private String title;

    public CategoryDTO(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
