package org.launchcode.art_gallery_backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UserProfileRequestDTO {

    @NotBlank(message = "Name is required")
    @Size(min = 3, message = "Name should be atleast 3 characters")
    private String name;

    @NotNull(message = "Email is required")
    @Email(message = "Provide valid email address")
    private String email;

    @NotNull(message = "Password is required")
    @Size(min = 5, message = "Password should be atleast 5 characters")
    private String password;

    public UserProfileRequestDTO() {
    }

    public UserProfileRequestDTO(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
