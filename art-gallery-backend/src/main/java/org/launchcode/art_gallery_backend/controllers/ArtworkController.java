package org.launchcode.art_gallery_backend.controllers;

import jakarta.validation.Valid;
import org.launchcode.art_gallery_backend.models.Artwork;
import org.launchcode.art_gallery_backend.repositories.ArtworkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.resource.NoResourceFoundException;

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
    public ResponseEntity<?> getArtworkById(@PathVariable int artworkId) throws NoResourceFoundException {
        Artwork artwork = artworkRepository.findById(artworkId).orElse(null);
        if (artwork == null) {
            String path = "/api/artworks/details/" + artworkId;
            throw new NoResourceFoundException(HttpMethod.GET, path); // 404
        } else {
            return new ResponseEntity<>(artwork, HttpStatus.OK); // 200
        }
    }

    // Save new artwork to database
    // Accepts JSON payload instead of using query params
    // With @RequestBody, Spring automatically converts incoming JSON to an Artwork object
    // POST http://localhost:8080/api/artworks/add
    @PostMapping(value="/add", consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewArtwork(@Valid @RequestBody Artwork artwork) {
        artworkRepository.save(artwork); // Hibernate updates artwork object with id after saving
        return new ResponseEntity<>(artwork, HttpStatus.CREATED); // 201
    } // @Valid enables enforcement of rules in model

    // Delete an existing artwork from the database
    // DELETE http://localhost:8080/api/artworks/delete/6 (for example)
    @DeleteMapping(value="/delete/{artworkId}")
    public ResponseEntity<?> deleteArtwork(@PathVariable int artworkId) throws NoResourceFoundException {
        Artwork artwork = artworkRepository.findById(artworkId).orElse(null);
        if (artwork == null) {
            String path = "/api/artworks/delete/" + artworkId;
            throw new NoResourceFoundException(HttpMethod.DELETE, path); // 404
        } else {
            artworkRepository.deleteById(artworkId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
        }
    }

}
