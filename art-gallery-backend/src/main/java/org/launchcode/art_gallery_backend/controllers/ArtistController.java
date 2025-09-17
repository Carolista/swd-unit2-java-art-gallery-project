package org.launchcode.art_gallery_backend.controllers;

import jakarta.validation.Valid;
import org.launchcode.art_gallery_backend.models.Artist;
import org.launchcode.art_gallery_backend.repositories.ArtistRepository;
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
@RequestMapping("/api/artists")
public class ArtistController {

    @Autowired
    ArtistRepository artistRepository;

    // Retrieve all artists from database
    // GET http://localhost:8080/api/artists
    @GetMapping("")
    public ResponseEntity<?> getAllArtists() {
        List<Artist> allArtists = artistRepository.findAll();
        return new ResponseEntity<>(allArtists, HttpStatus.OK); // 200
    }

    // Retrieve a specific artist object using its id
    // GET http://localhost:8080/api/artists/details/3 (for example)
    @GetMapping(value="/details/{artistId}", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getArtistById(@PathVariable int artistId) throws NoResourceFoundException {
        Artist artist = artistRepository.findById(artistId).orElse(null);
        if (artist == null) {
            String path = "/api/artists/details/" + artistId;
            throw new NoResourceFoundException(HttpMethod.GET, path); // 404
        } else {
            return new ResponseEntity<>(artist, HttpStatus.OK); // 200
        }
    }

    // Save new artist to database
    // POST http://localhost:8080/api/artists/add
    @PostMapping(value="/add", consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewArtist(@Valid @RequestBody Artist artist) {
        artistRepository.save(artist);
        return new ResponseEntity<>(artist, HttpStatus.CREATED); // 201
    } // @Valid enables enforcement of rules in model

    // Delete an existing artist from the database
    // DELETE http://localhost:8080/api/artists/delete/6 (for example)
    @DeleteMapping(value="/delete/{artistId}")
    public ResponseEntity<?> deleteArtist(@PathVariable int artistId) throws NoResourceFoundException {
        Artist artist = artistRepository.findById(artistId).orElse(null);
        if (artist == null) {
            String path = "/api/artists/delete/" + artistId;
            throw new NoResourceFoundException(HttpMethod.DELETE, path); // 404
        } else {
            artistRepository.deleteById(artistId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
        }
    }
}