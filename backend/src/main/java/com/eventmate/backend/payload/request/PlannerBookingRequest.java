package com.eventmate.backend.payload.request;

import java.time.LocalDate;

public record PlannerBookingRequest(
    Long plannerId,
    LocalDate bookingDate,
    String userName,
    String userPhone,
    String eventType
) {}
