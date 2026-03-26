package com.pseudocodewebstudio.backend.domain.exception;

public class InvalidExerciseException extends RuntimeException {
    public InvalidExerciseException(String message) {
        super("Invalid exercise: " + message);
    }
}
