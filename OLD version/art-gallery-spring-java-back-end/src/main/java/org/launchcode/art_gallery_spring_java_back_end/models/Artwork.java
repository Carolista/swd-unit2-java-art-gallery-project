package org.launchcode.art_gallery_spring_java_back_end.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
public class Artwork {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private String title;

    @ManyToOne
    @JsonManagedReference
    private Artist artist;

    @ManyToMany
    @JsonManagedReference
    private List<Category> categories;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "details_id", referencedColumnName = "id")
    private ArtworkDetails details;

    public Artwork() {};

    public Artwork(String title, Artist artist, List<Category> categories, ArtworkDetails details) {
        this.title = title;
        this.artist = artist;
        this.categories = categories;
        this.details = details;
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

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategory(List<Category> categories) {
        this.categories = categories;
    }

    public ArtworkDetails getDetails() {
        return details;
    }

    public void setDetails(ArtworkDetails details) {
        this.details = details;
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
