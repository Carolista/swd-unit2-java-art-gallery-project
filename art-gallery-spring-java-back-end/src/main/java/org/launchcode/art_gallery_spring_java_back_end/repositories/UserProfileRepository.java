package org.launchcode.art_gallery_spring_java_back_end.repositories;

import org.launchcode.art_gallery_spring_java_back_end.models.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Integer> {

    Optional<UserProfile> findbyEmail(String email);

    Boolean existsByEmail(String email);
}
