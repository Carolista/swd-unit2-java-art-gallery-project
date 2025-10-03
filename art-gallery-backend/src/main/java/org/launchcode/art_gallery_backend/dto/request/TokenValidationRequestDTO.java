package org.launchcode.art_gallery_backend.dto.request;

public class TokenValidationRequestDTO {

    private String token;
    private String email;

    public TokenValidationRequestDTO() {
    }

    public TokenValidationRequestDTO(String token, String email) {
        this.token = token;
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
