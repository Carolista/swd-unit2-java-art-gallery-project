package org.launchcode.art_gallery_backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Objects;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    // TODO: Once CategoryDTO is created, transfer validation annotations for title

    @NotBlank(message="Category is required.")
    @Size(min=1, max=40, message="Category must be 1-40 characters long.")
    private String title;

    // TODO: Add a list of Artwork objects called "artworks", mapped by "categories"
    //  Set the one-to-one relationship and ensure that when
    //  JSON is formed there is no infinite recursion
    //  No need to add artworks to constructor or create getter/setter

    public Category() {};

    public Category(String title) {
        this.title = title;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return title;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Category category = (Category) o;
        return id == category.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}