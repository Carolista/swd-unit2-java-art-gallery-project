package org.launchcode.art_gallery_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// This enables us to perform CRUD ops within the database

@Repository
public interface ArtworkRepository extends JpaRepository {

    // See built-in methods at
    // https://docs.spring.io/spring-data/jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html

    // We will use methods inherited from CrudRepository, etc.
    // .findAll(), .save(), .findById(), .delete()
}
