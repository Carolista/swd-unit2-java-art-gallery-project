package org.launchcode.art_gallery_spring_java_back_end.controllers;

import org.launchcode.art_gallery_spring_java_back_end.models.Artist;
import org.launchcode.art_gallery_spring_java_back_end.models.dto.ArtistDTO;
import org.launchcode.art_gallery_spring_java_back_end.repositories.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/artists")
public class ArtistController {

    @Autowired
    ArtistRepository artistRepository;

    // GET the full list of artists
    // Endpoint is http://localhost:8080/api/artists
    @GetMapping("")
    public ResponseEntity<?> getAllArtists() {
        List<Artist> allArtists = artistRepository.findAll();
        return new ResponseEntity<>(allArtists, HttpStatus.OK); // 200
    }

    // GET a single artist using its id
    // Corresponds to http://localhost:8080/api/artists/details/3 (for example)
    @GetMapping(value="/details/{artistId}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getArtistById(@PathVariable(value="artistId") int artistId) {
        Artist currentArtist = artistRepository.findById(artistId).orElse(null);
        if (currentArtist != null) {
            return new ResponseEntity<>(currentArtist, HttpStatus.OK); // 200
        } else {
            String response = "Artist with ID of " + artistId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }

    // POST a new artist
    // Endpoint http://localhost:8080/api/artists/add?firstName=Claude&lastName=Monet&location=France (for example)
    @PostMapping(value="/add", consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createNewArtist(@RequestBody ArtistDTO artistData) {
        Artist newArtist = new Artist(artistData.getFirstName(), artistData.getLastName(), artistData.getLocation());
        artistRepository.save(newArtist);
        return new ResponseEntity<>(newArtist, HttpStatus.CREATED); // 201
    }

    // DELETE an existing artist
    // Corresponds to http://localhost:8080/api/artists/delete/6 (for example)
    @DeleteMapping(value="/delete/{artistId}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteArtist(@PathVariable(value="artistId") int artistId) {
        Artist currentArtist = artistRepository.findById(artistId).orElse(null);
        if (currentArtist != null) {
            artistRepository.deleteById(artistId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
        } else {
            String response = "Artist with ID of " + artistId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }
}
