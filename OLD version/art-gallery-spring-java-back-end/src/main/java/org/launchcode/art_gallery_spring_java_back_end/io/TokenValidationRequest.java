package org.launchcode.art_gallery_spring_java_back_end.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TokenValidationRequest {
    private String token;
    private String email;
}
