package org.launchcode.art_gallery_backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.Objects;

@Entity
public class Artwork {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message="Title is required.")
    @Size(min=2, max=50, message="Title must be 2-50 characters long.")
    private String title;

    @ManyToOne
    @NotNull(message = "Artist is required.")
    @JsonManagedReference
    private Artist artist;

    @OneToOne(cascade = CascadeType.ALL)
    @Valid // Passes down the enablement of validation when it cascades
    private Details details;

    @ManyToMany
    @JsonManagedReference
    private List<Category> categories;

    public Artwork() {};

    public Artwork(String title, Artist artist, List<Category> categories) {
        this.title = title;
        this.artist = artist;
        this.categories = categories;
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

    public Artist getArtist() {
        return artist;
    }

    public void setArtist(Artist artist) {
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
