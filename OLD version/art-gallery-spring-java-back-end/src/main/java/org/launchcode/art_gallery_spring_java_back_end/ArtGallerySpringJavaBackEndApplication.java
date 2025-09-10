package org.launchcode.art_gallery_spring_java_back_end;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ArtGallerySpringJavaBackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArtGallerySpringJavaBackEndApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

}
