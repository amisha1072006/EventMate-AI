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
                    new Hall(null, "The Skyview Terrace", "Wedding","https://images.pexels.com/photos/3835638/pexels-photo-3835638.jpeg",  "Delhi", "Wedding", "Veg", 150, 5000),
                    new Hall(null, "Sunset vista", "Engagement", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop", "Bangalore", "Engagement", "Non-Veg", 300, 10000),
                    new Hall(null, "Azure Villa", "Corporate Event", "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop", "Bangalore", "Corporate Event", "Both", 800, 5000),
                    new Hall(null, "The Sovereign Hall", "Wedding", "https://images.unsplash.com/photo-1542665952-14513db15293?q=80&w=2070&auto=format&fit=crop", "Lucknow", "Wedding", "Veg", 450, 10000),
                    new Hall(null, "The Legacy Hall", "Corporate Event", "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop", "Delhi", "Corporate Event", "Both", 600, 10000),
                   
                    new Hall(null, "The Golden Atrium", "Wedding", "https://media.istockphoto.com/id/2153497521/photo/moroccan-cultural-wedding-organization.jpg?s=2048x2048&w=is&k=20&c=6-0YPLf-u_A8y4dEO9AuzKg1A82mdVFS6F-V-pQw2Cw= ","Mumbai", "Wedding", "Veg", 200, 6000),
                    new Hall(null, "The Empress Hall", "Wedding", "https://media.istockphoto.com/id/450955083/photo/wedding.jpg?s=1024x1024&w=is&k=20&c=NrSTxwM01CQ6k5z_R_EJ0cEjHAZ4c8essmpIzRNwdnM=", "Lucknow", "Wedding", "Non-Veg", 100, 5000),
                    new Hall(null, "The Celebration Suite", "Birthday Party", "https://media.istockphoto.com/id/2034042466/photo/beautiful-table-decorated-for-15th-birthday.jpg?s=2048x2048&w=is&k=20&c=5l-j8nDFAuLiFAhGDs2-T-OFz3DgwOguQqUkaSMd6zI=", "Bangalore", "Birthday Party", "Veg", 350, 3000),
                    new Hall(null, "The Lagoon Deck", "Engagement", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop", "Delhi", "Engagement", "Both", 700, 2000),
                    new Hall(null, "The Serene Garden", "Engagement", "https://media.istockphoto.com/id/2238874796/photo/indian-traditional-wedding-ceremony-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=3QWPzilepCIeOQZmF6Svf89G6C0WVc2wVdYn7FGDNYQ=", "Pune", "Engagement", "Veg", 250, 5000),
                   
                    new Hall(null, "The Grand Buffet", "Corporate Event", "https://media.istockphoto.com/id/961798406/photo/stylish-champagne-glasses-and-food-appetizers-on-table-at-wedding-reception-luxury-catering-at.jpg?s=2048x2048&w=is&k=20&c=Ijq2AuCY88HyIHk3VLlNJH85l9IQdwNNuDfaONVVqp4=", "Mumbai", "Corporate Event", "Both", 900, 13000),
                    new Hall(null, "The Monarch Hall", "Birthday Party", "https://media.istockphoto.com/id/1446334741/photo/desserts-and-table-decorations-for-parties-and-celebrations-photography-of-snacks-and.jpg?s=2048x2048&w=is&k=20&c=W_T4nsYSZJU1YEw5x2JHzIrNPw_6Hxuegd4VTAzyBxY=", "Chennai", "Birthday Party", "Non-Veg", 80, 15000),
                    //13
                    new Hall(null, "The Beachside Canopy", "Wedding", "https://media.istockphoto.com/id/1059441412/photo/abstract-blurred-event-exhibition-with-people-background-business-convention-show-concept.jpg?s=2048x2048&w=is&k=20&c=sO7rKJhCkCOqP94c4_Jut3BC4e2vpUI8_SwwNLwTXgs=", "Lucknow", "Wedding", "Both", 550, 18000),
//trending 
                      new Hall(null, "Amber Bloom Banquets", "Wedding","/images/trending1.jpg", "Delhi", "Wedding", "Veg", 150, 5000),
                    new Hall(null, "Sunset Terrace", "Wedding","/images/trending2.jpeg",  "Mumbai", "Wedding", "Non-Veg", 300, 10000),
                    new Hall(null, "The White Palace", "Wedding","/images/trending4.jpeg",   "Bangalore", "Wedding", "Both", 800, 5000),
                   new Hall(null, "The Summit Hall", "Wedding", "/images/trending5.jpeg",  "Pune", "Wedding", "Non-Veg", 300, 10000),
                    new Hall(null, "The  Vernda", "Wedding","/images/trending3.jpeg",   "Bangalore", "Wedding", "Both", 800, 5000),


                    
                    new Hall(null, "The Regent's Club", "Wedding","https://media.istockphoto.com/id/1455919586/photo/the-beautiful-decorations-cultural-program.jpg?s=1024x1024&w=is&k=20&c=J-63Pn0mhVhPT9yUBbogYGIRVGya6PTJngwpxsSgNHI=",  "Delhi", "Wedding", "Veg", 150, 5000),
                    new Hall(null, "The Onyx Suite", "Wedding", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop", "Pune", "Wedding", "Non-Veg", 300, 10000),
                    new Hall(null, "Ocean View", "Wedding", "https://media.istockphoto.com/id/2238876846/photo/indian-traditional-wedding-ceremony-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=p7jD-TSxnGigDfhJvvdaatuwFKPQxuQnt8DLNOVqX7Y=",  "Bangalore", "Wedding", "Both", 800, 5000),
                    new Hall(null, "Royal Gardens", "Wedding", "https://media.istockphoto.com/id/2195948319/photo/indian-wedding-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=yQ31b_IaY_NVQQMWALmqtfu9cr6siqsdEaXpXccRSsQ=",  "Chennai", "Wedding", "Veg", 450, 10000),
                    new Hall(null, "The Floral Canopy", "Wedding", "https://media.istockphoto.com/id/2196449572/photo/indian-wedding-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=5NclCrOw8x3wVX9o5Mwzr-aqP6P3QCW6tvPspqVtrCI=","Chennai", "Wedding", "Both", 600, 10000),
                    
                    new Hall(null, "The Lotus Pavilion", "Wedding", "https://images.pexels.com/photos/33417234/pexels-photo-33417234.jpeg", "Mumbai", "Wedding", "Veg", 200, 6000),
                    new Hall(null, "The Royal Dias", "Wedding","https://images.pexels.com/photos/32994470/pexels-photo-32994470.jpeg",  "Lucknow", "Wedding", "Non-Veg", 100, 5000),
                    
                    new Hall(null, "The Forum", "Corporate Event","https://images.pexels.com/photos/50675/banquet-wedding-society-deco-50675.jpeg",  "Bangalore", "Corporate Event", "Veg", 350, 3000),
                    new Hall(null, "The Convetion Plaza", "Corporate Event ",    "https://media.istockphoto.com/id/1133692578/photo/exhibition-event-hall-blur-background-of-trade-show-business-world-or-international-expo.jpg?s=2048x2048&w=is&k=20&c=YTnHhSaD9oWH-QWORQ1V8iPxsTwug3msm4VGGReVrlo=",  "Delhi", "Corporate Event", "Both", 700, 2000),
                    new Hall(null, "The Grand Theatre", "Corporate Event","https://media.istockphoto.com/id/1125802247/photo/abstract-blurred-image-of-conference-and-presentation-in-the-conference-hall.jpg?s=2048x2048&w=is&k=20&c=AvtzuNwftNaKMtDbB5aML2x441WxFvUn3r6jovt3Zeo=",  "Pune", "Corporate Event", "Veg", 250, 5000),
                   // new Hall(null, "The Majestic", "Corporate","https://media.istockphoto.com/id/1125802247/photo/abstract-blurred-image-of-conference-and-presentation-in-the-conference-hall.jpg?s=2048x2048&w=is&k=20&c=AvtzuNwftNaKMtDbB5aML2x441WxFvUn3r6jovt3Zeo=", "Mumbai", "Corporate Event", "Both", 900, 13000),
                    new Hall(null, "The Exhibition Hall", "Corporate Event",    "https://media.istockphoto.com/id/1059441412/photo/abstract-blurred-event-exhibition-with-people-background-business-convention-show-concept.jpg?s=2048x2048&w=is&k=20&c=sO7rKJhCkCOqP94c4_Jut3BC4e2vpUI8_SwwNLwTXgs=",  "Chennai", "Corporate Event", "Non-Veg", 80, 15000),
                    new Hall(null, "The Garden Arch", "Corporate Event","https://media.istockphoto.com/id/530686143/photo/group-of-conference-participants-standing-in-lobby-of-conference-center-socializing-during.jpg?s=2048x2048&w=is&k=20&c=silyy0mNTULmxji7j5SkdsJfBVxhWBWMBcC27JJosOM=",  "Lucknow", "Corporate Event", "Both", 550, 18000),

                    new Hall(null, "The Midnight Blue Hall", "Birthday Party","https://media.istockphoto.com/id/2183824556/photo/three-candles-on-a-candlestick-burning-at-a-party.jpg?s=1024x1024&w=is&k=20&c=VBBFeOf2AlQFYWiNnRhFC4zjppxfb_H4yNhf4yKTQuc=",  "Bangalore", "Birthday Party", "Veg", 350, 3000),
                    new Hall(null, "The Regency", "Birthday Party",   "https://media.istockphoto.com/id/961798406/photo/stylish-champagne-glasses-and-food-appetizers-on-table-at-wedding-reception-luxury-catering-at.jpg?s=2048x2048&w=is&k=20&c=Ijq2AuCY88HyIHk3VLlNJH85l9IQdwNNuDfaONVVqp4=",     "Delhi", "Birthday Party", "Both", 700, 2000),
                    new Hall(null, "The Celebration Arch", "Birthday Party",  "https://media.istockphoto.com/id/1163718652/photo/delicious-wedding-reception-birthday-cake-on-a-background-balloons-party-decor-copy-space.jpg?s=2048x2048&w=is&k=20&c=0CsKiE2O2oy8xAf8iAh8vffGuHFl2csA32Kq4c5NKFo=",  "Pune", "Birthday Party", "Veg", 250, 5000),
                    new Hall(null, "The Majestic", "Birthday Party","https://media.istockphoto.com/id/1454170096/photo/pink-decoration-with-balloons-and-swans-for-birthday-party.jpg?s=2048x2048&w=is&k=20&c=IdiOyGrGuYN8k_I4B6Ot8UiHH5OwxYX1PdNE5AQP3Ow=", "Mumbai", "Birthday Party", "Both", 900, 13000),
                    
                    new Hall(null, "The Golden Dias", "Engagement", "https://media.istockphoto.com/id/2197936306/photo/birthday-party-decorations-three-tiered-cake-with-pink-roses-happy-birthday-text-topper-and.jpg?s=2048x2048&w=is&k=20&c=P-WMfPd38giHrhErH46ZYeldsDggOmHyDxxPwTh09O4=",  "Delhi", "Engagement", "Non-Veg", 80, 15000),
                    new Hall(null, "The Pinnacle", "Engagement", "https://media.istockphoto.com/id/2172503802/photo/romantic-wedding-ceremony-on-the-sunny-beach.jpg?s=2048x2048&w=is&k=20&c=NzObe4VVkhbNU-I_AiEj4CsCIvx9JVMCzq2hxyLYblE=", "Mumbai", "Engagement", "Both", 550, 18000),

                    new Hall(null, "The Celebration Wall", "Engagement", "https://media.istockphoto.com/id/2238874796/photo/indian-traditional-wedding-ceremony-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=3QWPzilepCIeOQZmF6Svf89G6C0WVc2wVdYn7FGDNYQ=", "Mumbai", "Engagement", "Both", 900, 13000),
                    
                    new Hall(null, "The Festive Entrance", "Engagement","https://media.istockphoto.com/id/2172827163/photo/wedding-setty-back-with-floral-decorations.jpg?s=2048x2048&w=is&k=20&c=B90kHcL20hk_-VMNysUVCfyycsxS5Y1vT9022iMENPA=",   "Lucknow", "Engagement", "Non-Veg", 80, 15000),
                    new Hall(null, "The Networking Hub", "Engagement",   "https://media.istockphoto.com/id/996257874/photo/wedding-table-with-flower-compositions.jpg?s=1024x1024&w=is&k=20&c=Prx9f4FEJvBNgJR7F1VKgzmgc3fIMqWRCFoNLsvUbbM=",  "Chennayi", "Engagement", "Both", 550, 18000)

                );
                hallRepository.saveAll(initialHalls);
                System.out.println("Initial data has been populated.");
            } else {
                System.out.println("Database already contains data. Skipping population.");
            }
        };
    }
}


















