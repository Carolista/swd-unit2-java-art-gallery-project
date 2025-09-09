package org.launchcode.art_gallery_backend.controllers;

import org.launchcode.art_gallery_backend.models.Artwork;
import org.launchcode.art_gallery_backend.repositories.ArtworkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/artworks")
public class ArtworkController {

    @Autowired
    ArtworkRepository artworkRepository; // to interact with database

    // Retrieve all artworks from database
    // GET http://localhost:8080/api/artworks/
    @GetMapping("")
    public List<?> getAllArtworks() {
        return artworkRepository.findAll();
    }

    // Retrieve a specific artwork object using its id
    // GET http://localhost:8080/api/artworks/details/3 (for example)
    @GetMapping("/details/{artworkId}")
    public Artwork getArtworkById(@PathVariable int artworkId) {
        return artworkRepository.findById(artworkId).orElse(null);
    }

    // Save new artwork to database
    // Uses query parameters for dynamic results
    // POST http://localhost:8080/api/artworks/add
    @PostMapping("/add")
    public String addNewArtwork(@RequestParam String title, String artist) {
        Artwork newArtwork = new Artwork(title, artist);
        artworkRepository.save(newArtwork);
        return "Artwork added: " + newArtwork;
    }

}
