package org.launchcode.art_gallery_spring_java_back_end.services.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.launchcode.art_gallery_spring_java_back_end.exceptions.ItemExistsException;
import org.launchcode.art_gallery_spring_java_back_end.models.UserProfile;
import org.launchcode.art_gallery_spring_java_back_end.models.dto.UserProfileDTO;
import org.launchcode.art_gallery_spring_java_back_end.repositories.UserProfileRepository;
import org.launchcode.art_gallery_spring_java_back_end.services.UserProfileService;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final ModelMapper modelMapper;

    private final PasswordEncoder encoder;

    @Override
    public UserProfileDTO createUserProfile (UserProfileDTO userProfileDTO) {
        if (userProfileRepository.existsByEmail(userProfileDTO.getEmail())) {
            throw new ItemExistsException("Profile already exists for " + userProfileDTO.getEmail());
        }
        userProfileDTO.setPassword(encoder.encode(userProfileDTO.getPassword()));
        UserProfile userProfile = mapToProfileEntity(userProfileDTO);
        userProfile = userProfileRepository.save(userProfile); // returns saved object with generated id
        return mapToProfileDTO(userProfile);
    }

    // Mapper method to map values from entity to DTO
    private UserProfileDTO mapToProfileDTO(UserProfile profileEntity) {
        return modelMapper.map(profileEntity, UserProfileDTO.class);
    }

    // Mapper method to map values from DTO to entity
    private UserProfile mapToProfileEntity(UserProfileDTO userProfileDTO) {
        return modelMapper.map(userProfileDTO, UserProfile.class);
    }
}
