package org.launchcode.art_gallery_backend.services;


import org.launchcode.art_gallery_backend.exceptions.ItemAlreadyExistsException;
import org.launchcode.art_gallery_backend.models.UserProfile;
import org.launchcode.art_gallery_backend.dto.UserProfileDTO;
import org.launchcode.art_gallery_backend.repositories.UserProfileRepository;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserProfileServiceImpl implements UserProfileService {

    private final ModelMapper modelMapper;
    private final UserProfileRepository userProfileRepository;
    private final PasswordEncoder encoder;

    public UserProfileServiceImpl(ModelMapper modelMapper, UserProfileRepository userProfileRepository, PasswordEncoder encoder) {
        this.modelMapper = modelMapper;
        this.userProfileRepository = userProfileRepository;
        this.encoder = encoder;
    }

    @Override
    public UserProfileDTO createUserProfile (UserProfileDTO userProfileDTO) {
        if (userProfileRepository.existsByEmail(userProfileDTO.getEmail())) {
            throw new ItemAlreadyExistsException("Profile already exists for " + userProfileDTO.getEmail());
        }
        userProfileDTO.setPassword(encoder.encode(userProfileDTO.getPassword()));
        UserProfile userProfile = mapToProfileEntity(userProfileDTO);
        userProfile = userProfileRepository.save(userProfile); // returns saved object with generated id
        return mapToProfileDTO(userProfile);
    }

    // Map values from entity to DTO
    private UserProfileDTO mapToProfileDTO(UserProfile profileEntity) {
        return modelMapper.map(profileEntity, UserProfileDTO.class);
    }

    // Map values from DTO to entity
    private UserProfile mapToProfileEntity(UserProfileDTO userProfileDTO) {
        return modelMapper.map(userProfileDTO, UserProfile.class);
    }
}
