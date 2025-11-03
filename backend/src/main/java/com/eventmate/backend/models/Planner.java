package com.eventmate.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "planners")
public class Planner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long plannerId;

    @Column(nullable = false)
    private String name;

    private String specialization;

    private String contact;
    
    private double rating;
    
    private double startingPrice; 
    
    private String imageLink;
    
    // ------------------------------------
    // START: Getters and Setters
    // ------------------------------------

    public Long getPlannerId() {
        return plannerId;
    }

    public void setPlannerId(Long plannerId) {
        this.plannerId = plannerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public double getStartingPrice() {
        return startingPrice;
    }

    public void setStartingPrice(double startingPrice) {
        this.startingPrice = startingPrice;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }
    
    //------------------------------------
   // END: Getters and Setters
   // ------------------------------------
}



// package com.eventmate.backend.models;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.Table;

// @Entity
// @Table(name = "planners")
// public class Planner {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long plannerId;

//     @Column(nullable = false)
//     private String name;

//     private String specialization;

//     private String contact;
    
//     private double rating;
    
//     private double startingPrice; 
    
//     private String imageLink;
    
//     // ------------------------------------
//     // START: Getters and Setters
//     // ------------------------------------

//     public Long getPlannerId() {
//         return plannerId;
//     }

//     public void setPlannerId(Long plannerId) {
//         this.plannerId = plannerId;
//     }

//     public String getName() {
//         return name;
//     }

//     public void setName(String name) {
//         this.name = name;
//     }

//     public String getSpecialization() {
//         return specialization;
//     }

//     public void setSpecialization(String specialization) {
//         this.specialization = specialization;
//     }

//     public String getContact() {
//         return contact;
//     }

//     public void setContact(String contact) {
//         this.contact = contact;
//     }

//     public double getRating() {
//         return rating;
//     }

//     public void setRating(double rating) {
//         this.rating = rating;
//     }

//     public double getStartingPrice() {
//         return startingPrice;
//     }

//     public void setStartingPrice(double startingPrice) {
//         this.startingPrice = startingPrice;
//     }

//     public String getImageLink() {
//         return imageLink;
//     }

//     public void setImageLink(String imageLink) {
//         this.imageLink = imageLink;
//     }
    
//     // ------------------------------------
//     // END: Getters and Setters
//     // ------------------------------------
// }

