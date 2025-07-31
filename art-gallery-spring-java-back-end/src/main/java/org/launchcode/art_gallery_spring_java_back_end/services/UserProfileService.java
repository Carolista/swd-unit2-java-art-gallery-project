package org.launchcode.art_gallery_spring_java_back_end.services;

import org.launchcode.art_gallery_spring_java_back_end.models.dto.UserProfileDTO;

public interface UserProfileService {

    // Responsible for saving user profile to database

    UserProfileDTO createUserProfile(UserProfileDTO userProfileDTO);
}
