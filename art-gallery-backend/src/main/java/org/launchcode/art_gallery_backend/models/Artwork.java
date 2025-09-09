package org.launchcode.art_gallery_backend.models;

import java.util.Objects;

// TODO: Convert to an Entity so Hibernate can use this model to create a table in the database

public class Artwork {

    // TODO: Remove all traces of nextId from this file
    // Stored with class to preserve incrementation
    private static int nextId = 1;

    // TODO: Identify as primary key and ensure auto-incrementation by 1
    private final int id; // will be set in constructor

    private String title;
    private String artist;

    // TODO: Add a default constructor (required for database)

    public Artwork(String title, String artist) {
        this.id = nextId;
        this.title = title;
        this.artist = artist;
        nextId++;
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
