package org.launchcode.art_gallery_backend.data;

import org.launchcode.art_gallery_backend.models.Artwork;

import java.util.*;

public class ArtworkData {

    // TODO: Create new package alongside controllers and models called repositories
    //  Add interface called ArtworkRepository to new package and extend JpaRepository
    //  Then after controller methods have been updated, delete this file and the data package

    /* Temporary representation of database */

    // Will be replaced by a JPA Repository in Part 2
    // Each Artwork object is stored by its ID in a HashMap
    private static final Map<Integer, Artwork> artworks = new HashMap<>();

    /* Temporary methods for CRUD operations */

    // Will be replaced by JPA Repository method .findAll()
    public static Collection<Artwork> getAll() {
        return artworks.values();
    }

    // Will be replaced by JPA Repository method .save()
    public static void addNew(Artwork artwork) {
        artworks.put(artwork.getId(), artwork);
    }

    // Will be replaced by JPA Repository method .findById()
    public static Artwork getById(int id) {
        return artworks.get(id);
    }
}
