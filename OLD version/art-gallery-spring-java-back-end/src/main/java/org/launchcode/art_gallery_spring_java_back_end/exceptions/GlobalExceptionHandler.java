package org.launchcode.art_gallery_spring_java_back_end.exceptions;

import org.launchcode.art_gallery_spring_java_back_end.io.ErrorObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Global exceptional handler for all the exceptions
 * @author Bushan SC
 *
 * */
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ErrorObject handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        return ErrorObject.builder()
                .errorCode("DATA_NOT_FOUND")
                .statusCode(HttpStatus.NOT_FOUND.value())
                .message(ex.getMessage())
                .timestamp(new Date())
                .build();
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(ItemExistsException.class)
    public ErrorObject handleItemExistsException(ItemExistsException ex, WebRequest request) {
        return ErrorObject.builder()
                .errorCode("DATA_EXISTS")
                .statusCode(HttpStatus.CONFLICT.value())
                .message(ex.getMessage())
                .timestamp(new Date())
                .build();
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(BadCredentialsException.class)
    public ErrorObject handleBadCredentialsException(Exception ex, WebRequest request) {
        return ErrorObject.builder()
                .errorCode("BAD_CREDENTIALS")
                .statusCode(HttpStatus.UNAUTHORIZED.value())
                .message(ex.getMessage())
                .timestamp(new Date())
                .build();
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ErrorObject handleGeneralException(Exception ex, WebRequest request) {
        return ErrorObject.builder()
                .errorCode("UNEXPECTED_ERROR")
                .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message(ex.getMessage())
                .timestamp(new Date())
                .build();
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatusCode status,
                                                                  WebRequest request) {
        Map<String, Object> errorResponse = new HashMap<>();
        List<String> errors = ex.getBindingResult().getFieldErrors()
                .stream().map(field -> field.getDefaultMessage())
                .collect(Collectors.toList());
        errorResponse.put("statusCode", HttpStatus.BAD_REQUEST.value());
        errorResponse.put("message", errors);
        errorResponse.put("timestamp", new Date());
        errorResponse.put("errorCode", "VALIDATION_FAILED");
        return new ResponseEntity<Object>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
