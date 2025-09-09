package org.launchcode.art_gallery_spring_java_back_end.models;

import jakarta.persistence.*;

@Entity
public class ArtworkDetails {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private String yearCreated;
    private String media;
    private String description;
    private double width;
    private double height;
    private double depth;
    private String imageId;

    @OneToOne(mappedBy = "details")
    private Artwork artwork;

    public ArtworkDetails() {}

    public ArtworkDetails(String yearCreated, String media, String description, double width, double height, double depth, String imageId) {
        this.yearCreated = yearCreated;
        this.media = media;
        this.description = description;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.imageId = imageId;
    }

    public String getYearCreated() {
        return yearCreated;
    }

    public void setYearCreated(String yearCreated) {
        this.yearCreated = yearCreated;
    }

    public String getMedia() {
        return media;
    }

    public void setMedia(String media) {
        this.media = media;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getDepth() {
        return depth;
    }

    public void setDepth(double depth) {
        this.depth = depth;
    }

    public String getImageId() {
        return imageId;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
    }

}
