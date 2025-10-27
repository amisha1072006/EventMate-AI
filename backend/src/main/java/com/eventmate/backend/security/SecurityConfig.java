package com.eventmate.backend.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableMethodSecurity 
public class SecurityConfig {

    @Autowired
    UserDetailsService userDetailsService;

    // JWT Classes Autowired
    @Autowired
    private AuthEntryPointJwt unauthorizedHandler; // Ab yeh class aapko banani padi hogi
    
    @Autowired
    private JwtAuthFilter jwtAuthFilter; // JwtAuthFilter ka sahi naam

    // --- Core Beans ---

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    // --- MUKHYA CONFIGURATION: Endpoints aur CORS ---
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        
        // 1. CORS Configuration (CORS Error Fix)
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

        http.csrf(csrf -> csrf.disable()) 
            .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                
                // 2. Authentication Endpoints (Signup/Login)
                .requestMatchers("/api/auth/**").permitAll()
                
                // 3. PHOTOGRAPHER DETAILS & SUGGESTIONS (403 FIX)
                .requestMatchers("/api/photographers/available").permitAll() // Suggestions page
                .requestMatchers("/api/photographers/{id}").permitAll()    // Photographer details
                .requestMatchers("/api/photographers/all").permitAll()
                // Agar aapka koi hardcoded path tha toh use bhi allow karein
                .requestMatchers("/api/photographers/2/1").permitAll() 
                
                // 4. BOOKING ENDPOINT (Sirf Logged-in Users ke liye)
                .requestMatchers("/api/photographers/book").authenticated() 
                // Planner Endpoints ko allow karein
                 .requestMatchers("/api/planners/available").permitAll()
                 .requestMatchers("/api/planners/{id}").permitAll()
                 .requestMatchers("/api/planners/book").authenticated() // Booking ke liye login zaroori
                 .requestMatchers("/api/halls/**").permitAll()
                 .requestMatchers("api/project-qa/**").permitAll()
                                 
                // 5. Baaki sabke liye login zaroori hai
                .anyRequest().authenticated()
            );

        http.authenticationProvider(authenticationProvider());
        
        // JWT filter ko add karein
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    
    // --- CORS Bean Definition (Step 1 ka hissa) ---
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Aapke frontend ka URL (CORS FIX)
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); 
        
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
        configuration.setAllowCredentials(true); 
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}