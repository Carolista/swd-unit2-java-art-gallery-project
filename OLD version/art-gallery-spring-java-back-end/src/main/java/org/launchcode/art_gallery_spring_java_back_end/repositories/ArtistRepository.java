package org.launchcode.art_gallery_spring_java_back_end.repositories;

import org.launchcode.art_gallery_spring_java_back_end.models.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Integer> {
}
