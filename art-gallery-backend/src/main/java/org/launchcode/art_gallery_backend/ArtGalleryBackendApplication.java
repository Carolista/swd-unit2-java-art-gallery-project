package org.launchcode.art_gallery_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ArtGalleryBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArtGalleryBackendApplication.class, args);
	}

}

// TODO #2 - Create a UserProfile entity for table creation

// TODO #3 - Create UserProfile repository

// TODO #4 - Create DTOs (AuthRequestDTO, AuthResponseDTO,
//  UserProfileRequestDTO, UserProfileResponseDTO, UserProfileDTO, TokenValidationRequestDTO)

// TODO #5 - Create JwtTokenUtil

// TODO #7 - Create services package with TokenBlacklistService, CustomUserDetailsService,
//  UserProfileService (interface) and UserProfileServiceImpl (class)

// TODO #8 - Add configurations (JwtRequestFilter, WebSecurityConfig, and AppConfiguration)

// TODO #9 - Add AuthController

// TODO #10 - Test endpoints with Postman (register, login, logout, and CRUD ops with and without auth token)
