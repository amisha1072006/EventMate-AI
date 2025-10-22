// File Location: src/main/java/com/eventmate/backend/models/Hall.java

package com.eventmate.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "halls")
//@Data // Lombok: Generates getters, setters, toString, etc.
@NoArgsConstructor // Lombok: Generates a no-argument constructor
@AllArgsConstructor // Lombok: Generates a constructor with all arguments
public class Hall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hall_id")
    private Long hallId;

    @Column(name = "hall_name")
    private String hallName;

    private String categories; // 'categories' from your JSON data

    @Column(name = "image_link", columnDefinition = "TEXT")
    private String imageLink;

    private String location;

    // This field wasn't in your JSON, so I'm mapping 'eventType' to it.
    @Column(name = "full_location", columnDefinition = "TEXT")
    private String eventType;

    private String food;

    private int capacity;

    private int budget;

    public Hall(Object o, String sunsetHall, String corporate, String url, String mumbai, String engagement, String s, int i, int i1) {
    }

    // --- START: Manual Getters ---
    public Long getHallId() {
        return this.hallId;
    }

    public String getHallName() {
        return this.hallName;
    }

    public String getImageLink() {
        return this.imageLink;
    }

    // --- ADDED: Getters for new fields (YAHAN ADD KIYA GAYA HAI) ---
    public String getLocation() {
        return this.location;
    }

    public int getCapacity() {
        return this.capacity;
    }

    public int getBudget() {
        return this.budget;
    }
    // --- END: ADDED Getters ---


    /*
     * // This constructor seems unusual and might not be needed.
     * // Commenting it out. If you need it, please uncomment and adjust.
     * public Hall(Object o, String eliteBanquets, String weddings, String url, String
     * delhi, String corporateEvent, String veg, int i, int i1) {
     * }
     */
}