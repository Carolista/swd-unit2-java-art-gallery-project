package org.launchcode.art_gallery_backend.models;

import jakarta.persistence.*;

import java.util.Objects;

@Entity // Hibernate will use this model to create a table in the database
public class Artwork {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // Will be set by database

    // TODO: Add validation so that the value cannot be blank or null
    //  It also should be limited to 2-50 characters long
    private String title;

    // TODO: Add validation so that the value cannot be blank or null
    //  It also needs to be limited to 2-30 characters long
    private String artist;

    public Artwork() {}; // Default constructor required for database

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
