package com.dev.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dev.backend.model.User;
import com.dev.backend.service.UserService;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "https://devshubham07.github.io"})
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        // For demo purposes, create a mock user if credentials match
        if ("admin".equals(username) && "admin123".equals(password)) {
            User mockUser = new User();
            mockUser.setId(1L);
            mockUser.setUsername(username);
            mockUser.setEmail(username + "@company.com");
            mockUser.setPassword("***"); // Don't send password back
            mockUser.setRole(com.dev.backend.model.Role.ADMIN);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("user", mockUser);
            response.put("message", "Login successful");
            
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Invalid credentials");
            
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
} 