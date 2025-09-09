package org.launchcode.art_gallery_spring_java_back_end.exceptions;

public class ItemExistsException extends RuntimeException{

    public ItemExistsException(String message) {
        super(message);
    }
}
