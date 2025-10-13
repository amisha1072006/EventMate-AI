package com.eventmate.backend.payload.request;

import java.time.LocalDateTime;

public record HallBookingRequest(
    Long hallId,
    String userName, // ADDED BACK
    String userPhone, // ADDED BACK
    LocalDateTime bookingTime
) {}


