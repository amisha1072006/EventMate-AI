package com.eventmate.backend.payload.request;

import java.time.LocalDate;

// Ek Record (ya class) banayein jo frontend se data lega
public record PhotographerBookingRequest(
    Long photographerId,
    LocalDate bookingDate,
    String userName,
    String userPhone,
    String eventType
) {}
