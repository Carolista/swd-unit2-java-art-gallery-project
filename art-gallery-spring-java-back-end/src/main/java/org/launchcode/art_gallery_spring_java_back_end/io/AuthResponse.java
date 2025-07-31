package org.launchcode.art_gallery_spring_java_back_end.io;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private String email;
}
