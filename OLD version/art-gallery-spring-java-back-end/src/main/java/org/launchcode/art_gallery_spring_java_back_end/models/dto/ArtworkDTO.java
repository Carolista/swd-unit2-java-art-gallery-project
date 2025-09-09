package org.launchcode.art_gallery_spring_java_back_end.models.dto;

import org.launchcode.art_gallery_spring_java_back_end.models.Artist;
import org.launchcode.art_gallery_spring_java_back_end.models.ArtworkDetails;
import org.launchcode.art_gallery_spring_java_back_end.models.Category;

import java.util.ArrayList;
import java.util.List;

public class ArtworkDTO {

    private String title;
    private int artistId;
    private List<Integer> categoryIds;
    private ArtworkDetails details;

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

    public List<Integer> getCategoryIds() {
        return categoryIds;
    }
    public void setCategoryId(List<Integer> categoryIds) {
        this.categoryIds = categoryIds;
    }

    public ArtworkDetails getDetails() {
        return details;
    }
    public void setDetails(ArtworkDetails details) {
        this.details = details;
    }
}
