package com.eventmate.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "manage_halls")
public class ManageHall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ownerName;
    private String phoneNumber;
    private String hallName;
    private String hallAddress;
    private String hallDescription;
    private int capacity;
    private double budget;
    private String imageUrl1;

    // Constructors
    public ManageHall() {}

    public ManageHall(String ownerName, String phoneNumber, String hallName, String hallAddress,
                      String hallDescription, int capacity, double budget, String imageUrl1) {
        this.ownerName = ownerName;
        this.phoneNumber = phoneNumber;
        this.hallName = hallName;
        this.hallAddress = hallAddress;
        this.hallDescription = hallDescription;
        this.capacity = capacity;
        this.budget = budget;
        this.imageUrl1 = imageUrl1;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getHallName() { return hallName; }
    public void setHallName(String hallName) { this.hallName = hallName; }

    public String getHallAddress() { return hallAddress; }
    public void setHallAddress(String hallAddress) { this.hallAddress = hallAddress; }

    public String getHallDescription() { return hallDescription; }
    public void setHallDescription(String hallDescription) { this.hallDescription = hallDescription; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }

    public double getBudget() { return budget; }
    public void setBudget(double budget) { this.budget = budget; }

    public String getImageUrl1() { return imageUrl1; }
    public void setImageUrl1(String imageUrl1) { this.imageUrl1 = imageUrl1; }
}
