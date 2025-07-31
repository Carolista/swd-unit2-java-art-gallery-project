package org.launchcode.art_gallery_spring_java_back_end.services;

import lombok.RequiredArgsConstructor;
import org.launchcode.art_gallery_spring_java_back_end.models.UserProfile;
import org.launchcode.art_gallery_spring_java_back_end.repositories.UserProfileRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserProfileRepository userProfileRepository;

    // This allows us to use an email for logging in instead of the default username

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserProfile userProfile = userProfileRepository.findbyEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Profile not found for the email " + email));
        return new User(userProfile.getEmail(), userProfile.getPassword(), new ArrayList<>());
    }
}
