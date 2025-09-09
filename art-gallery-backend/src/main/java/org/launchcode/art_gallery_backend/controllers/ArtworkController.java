package org.launchcode.art_gallery_backend.controllers;

import org.launchcode.art_gallery_backend.data.ArtworkData;
import org.launchcode.art_gallery_backend.models.Artwork;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/artworks")
public class ArtworkController {

    // Corresponds to http://localhost:8080/api/artworks
    @GetMapping("")
    public Collection<Artwork> getAllArtworks() {
        return ArtworkData.getAll();
    }

    // Use a query parameter for dynamic results
    // Corresponds to http://localhost:8080/api/artworks/add?title=The+Starry+Night&artist=Vincent+van+Gogh (for example)
    @PostMapping("/add")
    public String addNewArtwork(@RequestParam(value="title") String title, @RequestParam(value="artist") String artist) {
        Artwork newArtwork = new Artwork(title, artist);
        ArtworkData.addNew(newArtwork);
        return "Artwork added: " + newArtwork;
    }

    // Use a path parameter for dynamic results
    // Corresponds to http://localhost:8080/api/artworks/details/3 (for example)
    @GetMapping("/details/{artworkId}")
    public Artwork displayArtworkDetails(@PathVariable(value="artworkId") int artworkId) {
        return ArtworkData.getById(artworkId);
    }
}
