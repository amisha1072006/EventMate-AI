package com.eventmate.backend.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "photographers")
public class Photographer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long photographerId;

    @Column(nullable = false)
    private String name;

    private String location;
    
    private double startingPrice;
    
    private String specialization;
    
    private String phone;
    
    private double rating;
    
    @Column(columnDefinition = "TEXT")
    private String about;

    @Column(columnDefinition = "TEXT")
    private String imageLink;

    // --- In fields ko frontend se match karne ke liye ---

    @ElementCollection // Simple List<String> ke liye
    @CollectionTable(name = "photographer_portfolio", joinColumns = @JoinColumn(name = "photographer_id"))
    @Column(name = "image_url", columnDefinition = "TEXT")
    private List<String> portfolio;
    
    @ElementCollection 
    @CollectionTable(name = "photographer_event_types", joinColumns = @JoinColumn(name = "photographer_id"))
    @Column(name = "event_type")
    private List<String> eventTypes;
    
    @ElementCollection 
    @CollectionTable(name = "photographer_working_hours", joinColumns = @JoinColumn(name = "photographer_id"))
    @Column(name = "time_slot")
    private List<String> workingHours;

    // --- Booking se relationship ---
    @JsonIgnore
    @OneToMany(mappedBy = "photographer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PhotographerBooking> bookings;

    // --- Getters and Setters ---
    // (Aapke IDE mein inhein generate karne ka shortcut bhi ho sakta hai)

    public Long getPhotographerId() {
        return photographerId;
    }

    public void setPhotographerId(Long photographerId) {
        this.photographerId = photographerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getStartingPrice() {
        return startingPrice;
    }

    public void setStartingPrice(double startingPrice) {
        this.startingPrice = startingPrice;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }

    public List<String> getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(List<String> portfolio) {
        this.portfolio = portfolio;
    }

    public List<String> getEventTypes() {
        return eventTypes;
    }

    public void setEventTypes(List<String> eventTypes) {
        this.eventTypes = eventTypes;
    }

    public List<String> getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(List<String> workingHours) {
        this.workingHours = workingHours;
    }

    public List<PhotographerBooking> getBookings() {
        return bookings;
    }

    public void setBookings(List<PhotographerBooking> bookings) {
        this.bookings = bookings;
    }
}