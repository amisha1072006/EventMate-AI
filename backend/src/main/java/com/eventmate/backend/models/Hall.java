package com.eventmate.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "halls")
@NoArgsConstructor
@AllArgsConstructor
public class Hall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hall_id")
    private Long hallId;

    @Column(name = "hall_name")
    private String hallName;

    private String categories;

    @Column(name = "image_link", columnDefinition = "TEXT")
    private String imageLink;

    private String location;

    // This field used in controller as eventType
    @Column(name = "full_location", columnDefinition = "TEXT")
    private String eventType;

    private String food;

    private int capacity;

    private int budget;

    public Hall(Object o, String eliteBanquets, String weddings, String url, String delhi, String corporateEvent, String veg, int i, int i1) {
    }

    // --- Explicit getters used by controller / service ---

    public Long getHallId() {
        return this.hallId;
    }

    public String getHallName() {
        return this.hallName;
    }

    public String getImageLink() {
        return this.imageLink;
    }

    public String getLocation() {
        return this.location;
    }

    public int getCapacity() {
        return this.capacity;
    }

    public int getBudget() {
        return this.budget;
    }

    // <-- ADDED MISSING GETTER -->
    public String getEventType() {
        return this.eventType;
    }

    // Optional: setters if you need them (kept minimal)
    public void setHallId(Long hallId) { this.hallId = hallId; }
    public void setHallName(String hallName) { this.hallName = hallName; }
    public void setCategories(String categories) { this.categories = categories; }
    public void setImageLink(String imageLink) { this.imageLink = imageLink; }
    public void setLocation(String location) { this.location = location; }
    public void setEventType(String eventType) { this.eventType = eventType; }
    public void setFood(String food) { this.food = food; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
    public void setBudget(int budget) { this.budget = budget; }
}
