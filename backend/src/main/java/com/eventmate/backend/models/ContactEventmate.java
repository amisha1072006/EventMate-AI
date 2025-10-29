package com.eventmate.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "owner_contact_message")
public class ContactEventmate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    @Column(length = 1000) // To allow long messages
    private String message;

    // ✅ Default Constructor
    public ContactEventmate() {}

    // ✅ Parameterized Constructor
    public ContactEventmate(String name, String email, String message) {
        this.name = name;
        this.email = email;
        this.message = message;
    }

    // ✅ Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
