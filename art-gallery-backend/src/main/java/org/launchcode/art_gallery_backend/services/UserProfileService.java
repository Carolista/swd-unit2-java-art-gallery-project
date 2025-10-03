package org.launchcode.art_gallery_backend.services;


import org.launchcode.art_gallery_backend.dto.UserProfileDTO;

public interface UserProfileService {

    UserProfileDTO createUserProfile(UserProfileDTO userProfileDTO);
}
