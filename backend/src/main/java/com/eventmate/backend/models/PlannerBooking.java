package com.eventmate.backend.models;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "planner_bookings")
public class PlannerBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "planner_id")
    private Planner planner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // Assume User entity exists

    private LocalDate bookingDate;
    private String eventType;
    private String userName;
    private String userPhone;

    // ------------------------------------
    // START: Getters and Setters
    // ------------------------------------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Planner getPlanner() {
        return planner;
    }

    public void setPlanner(Planner planner) {
        this.planner = planner;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }
    
    // ------------------------------------
    // END: Getters and Setters
    // ------------------------------------
}

// package com.eventmate.backend.models;

// import java.time.LocalDate;

// import jakarta.persistence.Entity;
// import jakarta.persistence.FetchType;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.Table;

// @Entity
// @Table(name = "planner_bookings")
// public class PlannerBooking {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @ManyToOne(fetch = FetchType.LAZY)
//     @JoinColumn(name = "planner_id")
//     private Planner planner;

//     @ManyToOne(fetch = FetchType.LAZY)
//     @JoinColumn(name = "user_id")
//     private User user; // Assume User entity exists

//     private LocalDate bookingDate;
//     private String eventType;
//     private String userName;
//     private String userPhone;

//     // ------------------------------------
//     // START: Getters and Setters
//     // ------------------------------------

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public Planner getPlanner() {
//         return planner;
//     }

//     public void setPlanner(Planner planner) {
//         this.planner = planner;
//     }

//     public User getUser() {
//         return user;
//     }

//     public void setUser(User user) {
//         this.user = user;
//     }

//     public LocalDate getBookingDate() {
//         return bookingDate;
//     }

//     public void setBookingDate(LocalDate bookingDate) {
//         this.bookingDate = bookingDate;
//     }

//     public String getEventType() {
//         return eventType;
//     }

//     public void setEventType(String eventType) {
//         this.eventType = eventType;
//     }

//     public String getUserName() {
//         return userName;
//     }

//     public void setUserName(String userName) {
//         this.userName = userName;
//     }

//     public String getUserPhone() {
//         return userPhone;
//     }

//     public void setUserPhone(String userPhone) {
//         this.userPhone = userPhone;
//     }
    
//     // ------------------------------------
//     // END: Getters and Setters
//     // ------------------------------------
// }

