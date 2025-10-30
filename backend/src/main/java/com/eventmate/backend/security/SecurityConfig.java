package com.eventmate.backend.security;

// --- SAARI ZAROORI IMPORTS (DONO FILES SE) ---
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity; // Surayya ke code se
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity; // Aapke code se
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
@EnableWebSecurity // Aapke code se
@EnableMethodSecurity // Surayya ke code se
public class SecurityConfig {

    // --- SAARI ZAROORI FIELDS (DONO FILES SE) ---
    @Autowired
    private JwtAuthFilter authFilter; // Aapka filter

    @Autowired
    private UserDetailsService userDetailsService; // Dono mein common

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler; // Surayya ka 401 Error Handler

    // --- CORE BEANS (DONO MEIN COMMON) ---
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // --- AAPKA CORS BEAN (YEH SAHI CHAL RAHA THA) ---
    @Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

    // --- YAHAN PAR BADLAV HAI ---
    // "*" ki jagah hum zaroori headers ko explicitly (saaf-saaf) allow karenge
    configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
    // -------------------------

    configuration.setAllowCredentials(Boolean.valueOf(true));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}

    // --- MUKHYA MERGED FILTER CHAIN ---
    // (Yahan dono ke features milaye gaye hain)
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                
                // Yeh Surayya ka feature hai (401 errors ko handle karne ke liye)
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                
                .authorizeHttpRequests(auth -> auth
                        
                        // --- DONO KE SAARE .requestMatchers() YAHAN HAIN ---
                        
                        // Aapke paths (Newsletter, Contact, Bookings, etc.)
                        .requestMatchers("/api/auth/**").permitAll() // Yeh common tha
                        .requestMatchers("/api/newsletter/**").permitAll()
                        .requestMatchers("/api/contact/**").permitAll()
                        .requestMatchers("/api/halls/**").permitAll() // Yeh common tha
                        .requestMatchers("/api/bookings/**").permitAll()
                        .requestMatchers("/api/chat/**").permitAll()
                        .requestMatchers("/api/managehalls/**").permitAll()
                        .requestMatchers("/api/managehallbookings/**").permitAll()
                        .requestMatchers("/api/contact-eventmate/**").permitAll()
                        
                        // Surayya ke paths (Photographers, Planners, QA)
                        .requestMatchers("/api/photographers/available").permitAll()
                        .requestMatchers("/api/photographers/{id}").permitAll()
                        .requestMatchers("/api/photographers/all").permitAll()
                        .requestMatchers("/api/photographers/2/1").permitAll() 
                        .requestMatchers("/api/planners/available").permitAll()
                        .requestMatchers("/api/planners/{id}").permitAll()
                        .requestMatchers("api/project-qa/**").permitAll()
                        
                        // Surayya ke Authenticated paths (Login zaroori)
                        .requestMatchers("/api/photographers/book").authenticated() 
                        .requestMatchers("/api/planners/book").authenticated()
                        
                        // Default (Baaki sabke liye login zaroori)
                        .anyRequest().authenticated()
                )
                
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}