package com.eventmate.backend.payload.request;

import java.time.LocalDateTime;

public record HallBookingRequest(
    Long hallId,
    String userName,
    String userPhone,
    LocalDateTime bookingTime
) {}