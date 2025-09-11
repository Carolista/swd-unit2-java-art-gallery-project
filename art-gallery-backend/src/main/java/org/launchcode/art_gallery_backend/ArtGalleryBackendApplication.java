package org.launchcode.art_gallery_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ArtGalleryBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArtGalleryBackendApplication.class, args);
	}

}

// AFTER ARTWORK FILES HAVE BEEN MODIFIED...

// ARTIST

// TODO: Create an Artist entity with id, firstName, lastName, and location
//  Each name should be required and 1-40 characters long
//  The location is NOT required

// TODO: Create an ArtistRepository and ArtistController with GET all, GET one, POST, and DELETE

// CATEGORY

// TODO: Create a Category entity with id and title
//  The title should be required and 1-60 characters long

// TODO: Create an CategoryRepository and CategoryController with GET all, GET one, POST, and DELETE

// TODO: Test all endpoints and possible responses for Artwork, Artist, and Category
//  using JSON payloads where needed (instead of query parameters)