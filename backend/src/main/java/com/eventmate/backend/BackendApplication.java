// File Location: src/main/java/com/eventmate/backend/BackendApplication.java

package com.eventmate.backend;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.eventmate.backend.models.Hall;
import com.eventmate.backend.repositories.HallRepository;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    // This bean will run on application startup
    @Bean
    CommandLineRunner initDatabase(HallRepository hallRepository) {
        return args -> {
            // Check if the database is already populated
            if (hallRepository.count() == 0) {
                System.out.println("Database is empty. Populating with initial data...");

                List<Hall> initialHalls = Arrays.asList(
                    new Hall(null, "Elite Banquets", "Weddings", "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop", "Delhi", "Corporate Event", "Veg", 150, 5000),
                    new Hall(null, "Sunset Hall", "Corporate", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop", "Mumbai", "Engagement", "Non-Veg", 300, 10000),
                    new Hall(null, "Ocean View", "Weddings", "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop", "Bangalore", "Wedding", "Both", 800, 5000),
                    new Hall(null, "Royal Gardens", "Corporate", "https://images.unsplash.com/photo-1542665952-14513db15293?q=80&w=2070&auto=format&fit=crop", "Lucknow", "Birthday Party", "Veg", 450, 10000),
                    new Hall(null, "The Heritage Club", "Birthdays", "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop", "Delhi", "Corporate Event", "Both", 600, 10000),
                    new Hall(null, "Golden Pavilion", "Concerts", "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070&auto=format&fit=crop", "Mumbai", "Birthday Party", "Veg", 200, 6000),
                    new Hall(null, "Starlight Lounge", "Birthdays", "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop", "Lucknow", "Engagement", "Non-Veg", 100, 5000),
                    new Hall(null, "The Rosewood", "Concerts", "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop", "Bangalore", "Wedding", "Veg", 350, 3000),
                    new Hall(null, "The Regency", "Concerts", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop", "Delhi", "Wedding", "Both", 700, 2000),
                    new Hall(null, "The Celestial", "Birthdays", "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop", "Pune", "Birthday Party", "Veg", 250, 5000),
                    new Hall(null, "The Majestic", "Weddings", "https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=1964&auto=format&fit=crop", "Mumbai", "Corporate Event", "Both", 900, 13000),
                    new Hall(null, "The Sovereign", "Corporate", "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop", "Chennai", "Birthday Party", "Non-Veg", 80, 15000),
                    new Hall(null, "The Pinnacle", "Weddings", "https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=1974&auto=format&fit=crop", "Lucknow", "Wedding", "Both", 550, 18000)
                );
                hallRepository.saveAll(initialHalls);
                System.out.println("Initial data has been populated.");
            } else {
                System.out.println("Database already contains data. Skipping population.");
            }
        };
    }
}


















