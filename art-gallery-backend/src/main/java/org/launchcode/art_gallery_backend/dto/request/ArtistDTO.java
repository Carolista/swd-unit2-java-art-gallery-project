package org.launchcode.art_gallery_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ArtistDTO {

    @NotBlank(message = "First name is required.")
    @Size(min = 1, max = 40, message = "First name must be 1-40 characters long.")
    private String firstName;

    @NotBlank(message = "Last name is required.")
    @Size(min = 1, max = 40, message = "Last name must be 1-40 characters long.")
    private String lastName;

    private String location;

    public ArtistDTO(String firstName, String lastName, String location) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.location = location;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
