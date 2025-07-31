package org.launchcode.art_gallery_spring_java_back_end.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserProfileResponse {

    private String email;

    private String name;

    private Timestamp createdAt;

    private Timestamp updatedAt;
}
