package com.example.eventmate_backend.controllers;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus; // <-- नया import
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.eventmate_backend.models.User;
import com.example.eventmate_backend.payload.request.LoginRequest;
import com.example.eventmate_backend.payload.request.OtpRequest;
import com.example.eventmate_backend.payload.request.PasswordResetRequest;
import com.example.eventmate_backend.payload.response.JwtResponse;
import com.example.eventmate_backend.repositories.UserRepository;
import com.example.eventmate_backend.security.JwtUtil;
import com.example.eventmate_backend.service.EmailService;

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
    @Autowired
    private EmailService emailService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User signUpRequest) {
        // (इसमें कोई बदलाव नहीं)
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Email is already in use!");
        }
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        // (इसमें कोई बदलाव नहीं)
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            
            String otp = String.format("%06d", new Random().nextInt(999999));
            User user = userRepository.findByEmail(loginRequest.getEmail());
            user.setOtp(otp);
            user.setOtpGeneratedTime(LocalDateTime.now());
            userRepository.save(user);

            try {
                emailService.sendOtpEmail(loginRequest.getEmail(), otp);
                return ResponseEntity.ok("OTP sent to your email. Please verify.");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: Could not send OTP email. The email address may not be active.");
            }
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Invalid email or password.");
        }
    }
    
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpRequest otpRequest) {
        // (इसमें कोई बदलाव नहीं)
        User user = userRepository.findByEmail(otpRequest.getEmail());
        if (user == null || user.getOtp() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Invalid request or OTP already verified.");
        }
        if (user.getOtpGeneratedTime().plusMinutes(5).isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: OTP has expired.");
        }
        if (user.getOtp().equals(otpRequest.getOtp())) {
            user.setOtp(null);
            user.setOtpGeneratedTime(null);
            userRepository.save(user);
            final UserDetails userDetails = user;
            final String jwt = jwtUtil.generateToken(userDetails);
            return ResponseEntity.ok(new JwtResponse(jwt));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Invalid OTP.");
    }
    
    // --- START: NEW FORGOT PASSWORD ENDPOINTS ---

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody LoginRequest loginRequest) { // We can reuse LoginRequest for just getting the email
        User user = userRepository.findByEmail(loginRequest.getEmail());
        if (user == null) {
            // हम यूजर को यह नहीं बताएंगे कि ईमेल मौजूद है या नहीं (सुरक्षा कारण)
            // We won't tell the user if the email exists or not (for security)
            return ResponseEntity.ok("If an account with this email exists, an OTP has been sent.");
        }

        String otp = String.format("%06d", new Random().nextInt(999999));
        user.setOtp(otp);
        user.setOtpGeneratedTime(LocalDateTime.now());
        userRepository.save(user);

        try {
            emailService.sendOtpEmail(user.getEmail(), otp); // This is the same service we used for login OTP
            return ResponseEntity.ok("OTP for password reset has been sent to your email.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: Could not send OTP email.");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null || user.getOtp() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Invalid request or OTP not requested.");
        }

        // Check if OTP is expired (5 minutes validity)
        if (user.getOtpGeneratedTime().plusMinutes(5).isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: OTP has expired.");
        }

        if (user.getOtp().equals(request.getOtp())) {
            // OTP is correct, so update the password
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            user.setOtp(null); // Invalidate the OTP after use
            user.setOtpGeneratedTime(null);
            userRepository.save(user);

            return ResponseEntity.ok("Password has been reset successfully. Please login with your new password.");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Invalid OTP.");
    }
    // --- END: NEW FORGOT PASSWORD ENDPOINTS ---
}