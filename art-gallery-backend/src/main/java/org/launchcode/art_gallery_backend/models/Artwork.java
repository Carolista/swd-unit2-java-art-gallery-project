package org.launchcode.art_gallery_backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Objects;

@Entity
public class Artwork {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message="Title is required.")
    @Size(min=2, max=50, message="Title must be 2-50 characters long.")
    private String title;

    // TODO: Refactor this to include an Artist object instead of a String
    //  Set the relationship and ensure that when JSON is formed there is no infinite recursion
    @NotBlank(message="Artist is required.")
    @Size(min=2, max=50, message="Artist must be 2-30 characters long.")
    private String artist;

    // TODO: Include a list of Category objects called "categories"
    //  Set the relationship and ensure that when JSON is formed there is no infinite recursion

    public Artwork() {};

    public Artwork(String title, String artist) {
        this.title = title;
        this.artist = artist;
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

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    @Override
    public String toString() {
        return title + " (" + artist + ")";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Artwork artwork = (Artwork) o;
        return id == artwork.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
