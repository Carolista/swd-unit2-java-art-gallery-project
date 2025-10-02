package org.launchcode.art_gallery_backend.repositories;

import org.launchcode.art_gallery_backend.models.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Integer> {

    Optional<UserProfile> findByEmail(String email);

    Boolean existsByEmail(String email);
}
