package org.launchcode.art_gallery_backend.controllers;

import org.launchcode.art_gallery_backend.models.Artwork;
import org.launchcode.art_gallery_backend.repositories.ArtworkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/artworks")
public class ArtworkController {

    @Autowired
    ArtworkRepository artworkRepository; // to interact with database

    // Retrieve all artworks from database
    // GET http://localhost:8080/api/artworks/
    @GetMapping("")
    public ResponseEntity<?> getAllArtworks() {
        List<Artwork> allArtworks = artworkRepository.findAll();
        return new ResponseEntity<>(allArtworks, HttpStatus.OK); // 200
    }

    // Retrieve a specific artwork object using its id
    // GET http://localhost:8080/api/artworks/details/3 (for example)
    @GetMapping(value="/details/{artworkId}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getArtworkById(@PathVariable int artworkId) {
        Artwork artwork = artworkRepository.findById(artworkId).orElse(null);
        if (artwork == null) {
            String response = "Artwork with ID of " + artworkId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        } else {
            return new ResponseEntity<>(artwork, HttpStatus.OK); // 200
        }
    }

    // Save new artwork to database
    // Accepts JSON payload instead of using query params
    // POST http://localhost:8080/api/artworks/add
    @PostMapping(value="/add", consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewArtwork(@RequestBody Artwork artwork) {
        artworkRepository.save(artwork);
        return new ResponseEntity<>(artwork, HttpStatus.CREATED); // 201
    }

    // Delete an existing artwork from the database
    // DELETE http://localhost:8080/api/artworks/delete/6 (for example)
    @DeleteMapping(value="/delete/{artworkId}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteArtwork(@PathVariable int artworkId) {
        Artwork artwork = artworkRepository.findById(artworkId).orElse(null);
        if (artwork == null) {
            String response = "Artwork with ID of " + artworkId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        } else {
            artworkRepository.deleteById(artworkId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
        }
    }

}
