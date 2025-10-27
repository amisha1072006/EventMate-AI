package com.eventmate.backend.models;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "manage_hall_bookings")
public class ManageHallBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Reference to the hall (not a DB foreign-key object here, just store id)
    private Long hallId;
    private String hallName;

    private String ownerName;
    private String ownerPhone;

    private String customerName;
    private String customerPhone;

    private LocalDate bookingDate;

    private String status; // e.g., "Booked", "Pending", "Cancelled"

    public ManageHallBooking() {}

    // Getters & setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getHallId() { return hallId; }
    public void setHallId(Long hallId) { this.hallId = hallId; }

    public String getHallName() { return hallName; }
    public void setHallName(String hallName) { this.hallName = hallName; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

    public String getOwnerPhone() { return ownerPhone; }
    public void setOwnerPhone(String ownerPhone) { this.ownerPhone = ownerPhone; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }

    public LocalDate getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDate bookingDate) { this.bookingDate = bookingDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
