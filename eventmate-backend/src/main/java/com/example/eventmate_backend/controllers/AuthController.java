package com.example.eventmate_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.eventmate_backend.models.User;
import com.example.eventmate_backend.payload.request.LoginRequest;
import com.example.eventmate_backend.payload.response.JwtResponse;
import com.example.eventmate_backend.repositories.UserRepository;
import com.example.eventmate_backend.security.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error: Email is already in use!");
        }
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        
        String rawPassword = signUpRequest.getPassword();
        String encodedPassword = passwordEncoder.encode(rawPassword);
        
        // --- DEBUGGING KE LIYE PRINT STATEMENTS ---
        System.out.println("--- SIGNUP PROCESS ---");
        System.out.println("User Email: " + signUpRequest.getEmail());
        System.out.println("Raw Password: " + rawPassword);
        System.out.println("Encoded Password to be saved: " + encodedPassword);
        System.out.println("----------------------");
        // ------------------------------------------
        
        user.setPassword(encodedPassword);
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // User details ko authentication object se prapt karein (behtar tarika)
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            
            String jwt = jwtUtil.generateToken(userDetails);
            
            return ResponseEntity.ok(new JwtResponse(jwt));

        } catch (AuthenticationException e) { // Exception ko aur specific banaya gaya hai
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Error: Invalid email or password.");
        }
    }
}