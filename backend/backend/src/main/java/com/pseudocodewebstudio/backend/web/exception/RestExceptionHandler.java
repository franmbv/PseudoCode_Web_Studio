package com.pseudocodewebstudio.backend.web.exception;

import com.pseudocodewebstudio.backend.domain.exception.InvalidExerciseException;
import com.pseudocodewebstudio.backend.domain.exception.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Error> handleResourceNotFoundException(ResourceNotFoundException ex) {
        Error error = new Error("Resource Not Found", ex.getMessage());
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(InvalidExerciseException.class)
    public ResponseEntity<Error> handleInvalidExerciseException(InvalidExerciseException ex) {
        Error error = new Error("Invalid Exercise", ex.getMessage());
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<Error>> handleException(MethodArgumentNotValidException ex){
        List<Error> errors = new ArrayList<>();

        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errors.add(new Error(error.getField(), error.getDefaultMessage()));
        });

        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Error> handleGeneralException(Exception ex) {
        Error error = new Error("Internal Server Error", ex.getMessage());
        return ResponseEntity.internalServerError().body(error);
    }

}
