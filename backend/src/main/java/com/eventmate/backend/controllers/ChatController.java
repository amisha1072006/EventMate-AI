//package com.eventmate.backend.controllers;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.reactive.function.client.WebClient;
//import reactor.core.publisher.Mono;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/chat")
//@CrossOrigin(origins = "http://localhost:5173")
//public class ChatController {
//
//    @Value("${openrouter.api.key}")
//    private String openRouterApiKey;
//
//    private final WebClient webClient = WebClient.builder()
//            .baseUrl("https://openrouter.ai/api/v1/chat/completions")
//            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
//            .build();
//
//    @PostMapping("/message")
//    public Mono<Map<String, String>> chat(@RequestBody Map<String, String> request) {
//        String userMessage = request.get("message");
//
//        // Prepare request body
//        Map<String, Object> body = new HashMap<>();
//        body.put("model", "nvidia/nemotron-nano-9b-v2:free"); // free model
//        body.put("messages", List.of(Map.of("role", "user", "content", userMessage)));
//
//        // Extra headers like Python example
//        Map<String, String> extraHeaders = Map.of(
//                "HTTP-Referer", "http://localhost:5173",
//                "X-Title", "EventMate Chatbot"
//        );
//
//        return webClient.post()
//                .headers(headers -> headers.setAll(extraHeaders))
//                .header(HttpHeaders.AUTHORIZATION, "Bearer " + openRouterApiKey)
//                .bodyValue(body)
//                .retrieve()
//                .bodyToMono(Map.class)
//                .map(response -> {
//                    try {
//                        // Extract the content from response
//                        List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
//                        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
//                        String content = message.get("content").toString();
//                        return Map.of("reply", content);
//                    } catch (Exception e) {
//                        e.printStackTrace();
//                        return Map.of("reply", "⚠️ Could not parse response from AI.");
//                    }
//                });
//    }
//}













package com.eventmate.backend.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend
public class ChatController {

    @Value("${openrouter.api.key}")
    private String openRouterApiKey;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://openrouter.ai/api/v1/chat/completions")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();

    @PostMapping("/message")
    public Mono<Map<String, String>> chat(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");

        // Prepare request body with domain knowledge
        Map<String, Object> body = new HashMap<>();
        body.put("model", "nvidia/nemotron-nano-9b-v2:free"); // free model
        body.put("messages", List.of(
                Map.of("role", "system", "content",
                        "You are EventMate Assistant, a helpful AI chatbot for a platform that helps users book venues, hire photographers, and plan events. " +
                                "Answer questions about venue booking, event types, services, pricing, and booking workflows clearly and politely."
                ),
                Map.of("role", "user", "content", userMessage)
        ));

        // Optional headers like in Python OpenRouter example
        Map<String, String> extraHeaders = Map.of(
                "HTTP-Referer", "http://localhost:5173",
                "X-Title", "EventMate Chatbot"
        );

        return webClient.post()
                .headers(headers -> headers.setAll(extraHeaders))
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + openRouterApiKey)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    try {
                        List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                        String content = message.get("content").toString();
                        return Map.of("reply", content);
                    } catch (Exception e) {
                        e.printStackTrace();
                        return Map.of("reply", "⚠️ Could not parse response from AI.");
                    }
                });
    }
}
