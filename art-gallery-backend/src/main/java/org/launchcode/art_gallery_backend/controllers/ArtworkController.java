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

    // TODO: Refactor to return a ResponseEntity object with an HttpStatus of 200 OK
    //  The response body (payload) should include the list of all artworks
    // Retrieve all artworks from database
    // GET http://localhost:8080/api/artworks/
    @GetMapping("")
    public List<?> getAllArtworks() {
        return artworkRepository.findAll();
    }


    // TODO: Refactor to return a ResponseEntity object with an HttpStatus
    //  of 200 OK if found or 404 NOT FOUND if not found
    //  Ensure the mapping is configured to produce JSON
    //  The response body (payload) should include the artwork object if found or throw an error if not found
    // Retrieve a specific artwork object using its id
    // GET http://localhost:8080/api/artworks/details/3 (for example)
    @GetMapping("/details/{artworkId}")
    public Artwork getArtworkById(@PathVariable int artworkId) {
        return artworkRepository.findById(artworkId).orElse(null);
    }


    // TODO: Refactor to return a ResponseEntity object with an HttpStatus of 201 CREATED
    //  Ensure the mapping is configured to consume JSON instead of using query params
    //  Let the method accept a full Artwork object as the sole ResponseBody parameter
    //  The response body (payload) should include the new artwork object
    // TODO: Ensure validation is enabled so rules in model are enforced
    // Save new artwork to database
    // POST http://localhost:8080/api/artworks/add
    @PostMapping("/add")
    public String addNewArtwork(@RequestParam String title, String artist) {
        Artwork newArtwork = new Artwork(title, artist);
        artworkRepository.save(newArtwork);
        return "Artwork added: " + newArtwork;
    }

    // TODO: Create a DELETE method that accepts an artworkId as a path param
    //  The method should return a ResponseEntity object with an HttpStatus
    //  of 204 NO CONTENT if found or 404 NOT FOUND if not found
    //  Ensure the mapping is configured to produce JSON
    //  No response body unless an error is thrown

}
