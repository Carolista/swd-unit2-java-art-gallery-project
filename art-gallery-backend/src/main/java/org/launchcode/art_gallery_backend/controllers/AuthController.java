package org.launchcode.art_gallery_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.launchcode.art_gallery_backend.dto.UserProfileDTO;
import org.launchcode.art_gallery_backend.dto.request.AuthRequestDTO;
import org.launchcode.art_gallery_backend.dto.request.TokenValidationRequestDTO;
import org.launchcode.art_gallery_backend.dto.request.UserProfileRequestDTO;
import org.launchcode.art_gallery_backend.dto.response.AuthResponseDTO;
import org.launchcode.art_gallery_backend.dto.response.UserProfileResponseDTO;
import org.launchcode.art_gallery_backend.services.CustomUserDetailsService;
import org.launchcode.art_gallery_backend.services.TokenBlacklistService;
import org.launchcode.art_gallery_backend.services.UserProfileService;
import org.launchcode.art_gallery_backend.utils.JwtTokenUtil;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class AuthController {

    private final ModelMapper modelMapper;
    private final UserProfileService userProfileService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final CustomUserDetailsService userDetailsService;
    private final TokenBlacklistService tokenBlacklistService;

    public AuthController(ModelMapper modelMapper, UserProfileService userProfileService, AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, CustomUserDetailsService userDetailsService, TokenBlacklistService tokenBlacklistService) {
        this.modelMapper = modelMapper;
        this.userProfileService = userProfileService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/register")
    public UserProfileResponseDTO createUserProfile(@Valid @RequestBody UserProfileRequestDTO userProfileRequest) {
        UserProfileDTO userProfileDTO = mapToUserProfileDTO(userProfileRequest);
        userProfileDTO = userProfileService.createUserProfile(userProfileDTO);
        return mapToUserProfileResponse(userProfileDTO);
    }

    @PostMapping("/login")
    public AuthResponseDTO authenticateUserProfile(@RequestBody AuthRequestDTO authRequest) throws Exception {
        authenticate(authRequest);
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
        final String token = jwtTokenUtil.generateToken(userDetails);
        return new AuthResponseDTO(token, authRequest.getEmail());
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PostMapping("/logout")
    public void logOut(HttpServletRequest request) {
        String jwtToken = extractJwtTokenFromRequest(request);
        if (jwtToken != null) {
            tokenBlacklistService.addTokenToBlacklist(jwtToken);
        }
    }

    @PostMapping("/validate-token")
    public ResponseEntity<String> checkTokenValidity(@RequestBody TokenValidationRequestDTO tokenValidationRequest) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(tokenValidationRequest.getEmail());
        if (jwtTokenUtil.validateToken(tokenValidationRequest.getToken(), userDetails)) {
            return new ResponseEntity<>("Token is valid", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid token", HttpStatus.UNAUTHORIZED);
        }
    }

    private String extractJwtTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private void authenticate(AuthRequestDTO authRequest) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        } catch (DisabledException ex) {
            throw new Exception("Profile disabled");
        }
    }

    // Mapper method to map values from request to DTO
    private UserProfileDTO mapToUserProfileDTO(UserProfileRequestDTO userProfileRequest) {
        return modelMapper.map(userProfileRequest, UserProfileDTO.class);
    }

    // Mapper method to map values from DTO to response
    private UserProfileResponseDTO mapToUserProfileResponse(UserProfileDTO userProfileDTO) {
        return modelMapper.map(userProfileDTO, UserProfileResponseDTO.class);
    }
}
