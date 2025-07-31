package org.launchcode.art_gallery_spring_java_back_end.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.launchcode.art_gallery_spring_java_back_end.io.AuthRequest;
import org.launchcode.art_gallery_spring_java_back_end.io.AuthResponse;
import org.launchcode.art_gallery_spring_java_back_end.io.UserProfileRequest;
import org.launchcode.art_gallery_spring_java_back_end.io.UserProfileResponse;
import org.launchcode.art_gallery_spring_java_back_end.models.dto.UserProfileDTO;
import org.launchcode.art_gallery_spring_java_back_end.services.CustomUserDetailsService;
import org.launchcode.art_gallery_spring_java_back_end.services.TokenBlacklistService;
import org.launchcode.art_gallery_spring_java_back_end.services.UserProfileService;
import org.launchcode.art_gallery_spring_java_back_end.utils.JwtTokenUtil;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class AuthController {

    private final ModelMapper modelMapper;
    private final UserProfileService userProfileService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final CustomUserDetailsService userDetailsService;
    private final TokenBlacklistService tokenBlacklistService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/register")
    public UserProfileResponse createUserProfile(@Valid @RequestBody UserProfileRequest userProfileRequest) {
        UserProfileDTO userProfileDTO = mapToUserProfileDTO(userProfileRequest);
        userProfileDTO = userProfileService.createUserProfile(userProfileDTO);
        return mapToUserProfileResponse(userProfileDTO);
    }

    @PostMapping("/login")
    public AuthResponse authenticateUserProfile(@RequestBody AuthRequest authRequest) throws Exception {
        authenticate(authRequest);
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
        final String token = jwtTokenUtil.generateToken(userDetails);
        return new AuthResponse(token, authRequest.getEmail());
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PostMapping("/logout")
    public void logOut(HttpServletRequest request) {
        String jwtToken = extractJwtTokenFromRequest(request);
        if (jwtToken != null) {
            tokenBlacklistService.addTokenToBlacklist(jwtToken);
        }
    }

    private String extractJwtTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private void authenticate(AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        } catch (DisabledException ex) {
            throw new Exception("Profile disabled");
        } catch (BadCredentialsException ex) {
            throw new Exception("Bad Credentials");
        }
    }

    // Mapper method to map values from request to DTO
    private UserProfileDTO mapToUserProfileDTO(UserProfileRequest userProfileRequest) {
        return modelMapper.map(userProfileRequest, UserProfileDTO.class);
    }

    // Mapper method to map values from DTO to response
    private UserProfileResponse mapToUserProfileResponse(UserProfileDTO userProfileDTO) {
        return modelMapper.map(userProfileDTO, UserProfileResponse.class);
    }
}
