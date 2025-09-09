package org.launchcode.art_gallery_backend.controllers;

import org.launchcode.art_gallery_backend.data.ArtworkData;
import org.launchcode.art_gallery_backend.models.Artwork;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/artworks")
public class ArtworkController {

    // Retrieve all artworks from database
    // GET http://localhost:8080/api/artworks/
    @GetMapping("")
    public Collection<Artwork> getAllArtworks() {
        return ArtworkData.getAll();
    }

    // Retrieve a specific artwork object using its id
    // GET http://localhost:8080/api/artworks/details/3 (for example)
    @GetMapping("/details/{artworkId}")
    public Artwork getArtworkById(@PathVariable int artworkId) {
        return ArtworkData.getById(artworkId);
    }

    // Optional HTML response for rendering formatted data directly
    // GET http://localhost:8080/api/artworks/details/3/html (for example)
    @GetMapping("/details/{artworkId}/html")
    public String displayArtworkDetails(@PathVariable int artworkId) {
        Artwork artwork = ArtworkData.getById(artworkId);
        return "<h2>ARTWORK</h2>" +
                "<p><b>ID:</b> " + artwork.getId() + "</p>" +
                "<p><b>Title:</b> " + artwork.getTitle() + "</p>" +
                "<p><b>Artist:</b> " + artwork.getArtist() + "</p>";
    }

    // Save new artwork to database
    // Uses query parameters for dynamic results
    // POST http://localhost:8080/api/artworks/add?title=The+Starry+Night&artist=Vincent+van+Gogh (for example)
    @PostMapping("/add")
    public String addNewArtwork(@RequestParam String title, String artist) {
        Artwork newArtwork = new Artwork(title, artist);
        ArtworkData.addNew(newArtwork);
        return "Artwork added: " + newArtwork;
    }

}
