package org.launchcode.art_gallery_backend.models;

import jakarta.persistence.*;

@Entity
public class Details {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private String yearCreated;
    private String media;

    @Lob
    private String description;

    private double height;
    private double width;
    private double depth;
    private String imageId;

    @OneToOne(mappedBy = "details")
    private Artwork artwork;

    public Details() {}

    public Details(String yearCreated, String media, String description, double height, double width, double depth, String imageId) {
        this.yearCreated = yearCreated;
        this.media = media;
        this.description = description;
        this.height = height;
        this.width = width;
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

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
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
