package com.dev.backend.exception;

public class InvalidAttendanceException extends RuntimeException {
    public InvalidAttendanceException(String message) {
        super(message);
    }
    
    public InvalidAttendanceException(String message, Throwable cause) {
        super(message, cause);
    }
}
