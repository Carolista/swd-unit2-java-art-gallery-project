package org.launchcode.art_gallery_spring_java_back_end.repositories;

import org.launchcode.art_gallery_spring_java_back_end.models.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtworkRepository extends JpaRepository<Artwork, Integer> {

    // Methods are automatically available without any implementation here.
    // See https://docs.spring.io/spring-data/jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html

}
