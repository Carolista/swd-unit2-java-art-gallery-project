package org.launchcode.art_gallery_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ArtGalleryBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArtGalleryBackendApplication.class, args);
	}

	// TODO: Add a Details entity model that contains the following fields:
	//  - int id,
	//  - Strings media and yearCreated
	//  - String description (annotated for TEXT instead of VARCHAR),
	//  - doubles width, height, depth, and
	//  - String imageId (not blank)
	//  Add a no-arg constructor and a full-arg constructor (except id).
	//  Add getters and setters (except id, which should have only a getter).
	//  Because Details has a one-to-one relationship with Artwork and
	//  will be embedded within Artwork, no repository or controller is necessary.
}
