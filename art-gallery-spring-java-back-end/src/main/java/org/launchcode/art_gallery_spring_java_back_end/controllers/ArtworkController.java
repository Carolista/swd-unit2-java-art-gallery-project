package org.launchcode.art_gallery_spring_java_back_end.controllers;

import org.launchcode.art_gallery_spring_java_back_end.models.Artist;
import org.launchcode.art_gallery_spring_java_back_end.models.Artwork;
import org.launchcode.art_gallery_spring_java_back_end.models.Category;
import org.launchcode.art_gallery_spring_java_back_end.models.dto.ArtworkDTO;
import org.launchcode.art_gallery_spring_java_back_end.repositories.ArtistRepository;
import org.launchcode.art_gallery_spring_java_back_end.repositories.ArtworkRepository;
import org.launchcode.art_gallery_spring_java_back_end.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/artworks")
public class ArtworkController {

    @Autowired
    ArtworkRepository artworkRepository;

    @Autowired
    ArtistRepository artistRepository;

    @Autowired
    CategoryRepository categoryRepository;

    // GET the full list of artworks
    // Endpoint is http://localhost:8080/api/artworks
    @GetMapping("")
    public ResponseEntity<?> getAllArtworks() {
        List<Artwork> allArtworks = artworkRepository.findAll();
        return new ResponseEntity<>(allArtworks, HttpStatus.OK); // 200
    }

    // GET a single artwork using its id
    // Corresponds to http://localhost:8080/api/artworks/details/3 (for example)
    @GetMapping(value="/details/{artworkId}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getArtworkById(@PathVariable(value="artworkId") int artworkId) {
        Artwork currentArtwork = artworkRepository.findById(artworkId).orElse(null);
        if (currentArtwork != null) {
            return new ResponseEntity<>(currentArtwork, HttpStatus.OK); // 200
        } else {
            String response = "Artwork with ID of " + artworkId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }

    // POST a new artwork
    // Endpoint http://localhost:8080/api/artworks/add?title=The+Starry+Night&artist=Vincent+van+Gogh (for example)
    @PostMapping(value="/add", consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createNewArtwork(@RequestBody ArtworkDTO artworkData) {
        Artist artist = artistRepository.findById(artworkData.getArtistId()).orElse(null);
        List<Category> categories = new ArrayList<>();
        for (int categoryId : artworkData.getCategoryIds()) {
            Category category = categoryRepository.findById(categoryId).orElse(null);
            if (category != null) {
                categories.add(category);
            }
        }
        Artwork newArtwork = new Artwork(artworkData.getTitle(), artist, categories, artworkData.getDetails());
        artworkRepository.save(newArtwork);
        return new ResponseEntity<>(newArtwork, HttpStatus.CREATED); // 201
    }

    // DELETE an existing artwork
    // Corresponds to http://localhost:8080/api/artworks/delete/6 (for example)
    @DeleteMapping(value="/delete/{artworkId}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteArtwork(@PathVariable(value="artworkId") int artworkId) {
        Artwork currentArtwork = artworkRepository.findById(artworkId).orElse(null);
        if (currentArtwork != null) {
            artworkRepository.deleteById(artworkId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
        } else {
            String response = "Artwork with ID of " + artworkId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }

}
