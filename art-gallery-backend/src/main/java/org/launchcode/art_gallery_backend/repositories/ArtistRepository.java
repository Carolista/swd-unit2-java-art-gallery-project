package org.launchcode.art_gallery_backend.repositories;

import org.launchcode.art_gallery_backend.models.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Integer> {
}
