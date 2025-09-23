package org.launchcode.art_gallery_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.launchcode.art_gallery_backend.models.Details;

public class ArtworkDTO {

    @NotBlank(message = "Title is required.")
    @Size(min = 2, max = 50, message = "Title must be 2-50 characters long.")
    String title;

    @NotNull(message = "Artist is required.")
    int artistId;

    int[] categoryIds;

    private Details details;

    public ArtworkDTO(String title, int artistId, int[] categoryIds, Details details) {
        this.title = title;
        this.artistId = artistId;
        this.categoryIds = categoryIds;
        this.details = details;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getArtistId() {
        return artistId;
    }

    public void setArtistId(int artistId) {
        this.artistId = artistId;
    }

    public int[] getCategoryIds() {
        return categoryIds;
    }

    public void setCategoryIds(int[] categoryIds) {
        this.categoryIds = categoryIds;
    }

    public Details getDetails() {
        return details;
    }

    public void setDetails(Details details) {
        this.details = details;
    }
}
