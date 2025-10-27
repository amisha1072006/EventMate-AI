package com.eventmate.backend;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.eventmate.backend.models.Hall;
import com.eventmate.backend.models.Photographer;
import com.eventmate.backend.models.Planner; 
import com.eventmate.backend.repositories.HallRepository;
import com.eventmate.backend.repositories.PhotographerRepository;
import com.eventmate.backend.repositories.PlannerRepository;

@SpringBootApplication
public class BackendApplication {

    private final PhotographerRepository photographerRepository;

    BackendApplication(PhotographerRepository photographerRepository) {
        this.photographerRepository = photographerRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
    
    // 💥 YEH AKHIRI AUR CORRECT FUNCTION HAI JO SABHI DATA KO INITIALIZE KAREGA
    @Bean
    public CommandLineRunner initDatabase(
        HallRepository hallRepository, 
        PlannerRepository plannerRepository, 
        PhotographerRepository photographerRepository
    ) {
        return args -> {
            
            // --- 1. HALL DATA INITIALIZATION ---
            if (hallRepository.count() == 0) {
                System.out.println("Database is empty. Populating Hall data...");

                List<Hall> initialHalls = Arrays.asList(
                    new Hall(null, "The Skyview Terrace", "Wedding","https://images.pexels.com/photos/3835638/pexels-photo-3835638.jpeg",  "Delhi", "Wedding", "Veg", 1500, 150000),
                    new Hall(null, "Sunset vista", "Engagement", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop", "Bangalore", "Engagement", "Non-Veg", 1000, 75000),
                    new Hall(null, "Azure Villa", "Corporate Event", "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop", "Bangalore", "Corporate Event", "Both", 800, 85000),
                    new Hall(null, "The Sovereign Hall", "Wedding", "https://images.unsplash.com/photo-1542665952-14513db15293?q=80&w=2070&auto=format&fit=crop", "Lucknow", "Wedding", "Veg", 2000, 100000),
                    new Hall(null, "The Legacy Hall", "Corporate Event", "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop", "Delhi", "Corporate Event", "Both", 600, 110000),
                    new Hall(null, "The Golden Atrium", "Wedding", "https://media.istockphoto.com/id/2153497521/photo/moroccan-cultural-wedding-organization.jpg?s=2048x2048&w=is&k=20&c=6-0YPLf-u_A8y4dEO9AuzKg1A82mdVFS6F-V-pQw2Cw= ","Mumbai", "Wedding", "Veg", 2200, 160000),
                    new Hall(null, "The Empress Hall", "Wedding", "https://media.istockphoto.com/id/450955083/photo/wedding.jpg?s=1024x1024&w=is&k=20&c=NrSTxwM01CQ6k5z_R_EJ0cEjHAZ4c8essmpIzRNwdnM=", "Lucknow", "Wedding", "Non-Veg", 1500, 150000),
                    new Hall(null, "The Celebration Suite", "Birthday Party", "https://media.istockphoto.com/id/2034042466/photo/beautiful-table-decorated-for-15th-birthday.jpg?s=2048x2048&w=is&k=20&c=5l-j8nDFAuLiFAhGDs2-T-OFz3DgwOguQqUkaSMd6zI=", "Bangalore", "Birthday Party", "Veg", 550, 55000),
                    new Hall(null, "The Lagoon Deck", "Engagement", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop", "Delhi", "Engagement", "Both", 700, 200000),
                    new Hall(null, "The Serene Garden", "Engagement", "https://media.istockphoto.com/id/2238874796/photo/indian-traditional-wedding-ceremony-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=3QWPzilepCIeOQZmF6Svf89G6C0WVc2wVdYn7FGDNYQ=", "Pune", "Engagement", "Veg", 950, 250000),
                    new Hall(null, "The Grand Buffet", "Corporate Event", "https://media.istockphoto.com/id/961798406/photo/stylish-champagne-glasses-and-food-appetizers-on-table-at-wedding-reception-luxury-catering-at.jpg?s=2048x2048&w=is&k=20&c=Ijq2AuCY88HyIHk3VLlNJH85l9IQdwNNuDfaONVVqp4=", "Mumbai", "Corporate Event", "Both", 900, 155000),
                    new Hall(null, "The Monarch Hall", "Birthday Party", "https://media.istockphoto.com/id/1446334741/photo/desserts-and-table-decorations-for-parties-and-celebrations-photography-of-snacks-and.jpg?s=2048x2048&w=is&k=20&c=W_T4nsYSZJU1YEw5x2JHzIrNPw_6Hxuegd4VTAzyBxY=", "Chennai", "Birthday Party", "Non-Veg", 1100, 165000),
                    new Hall(null, "The Beachside Canopy", "Wedding", "https://media.istockphoto.com/id/1059441412/photo/abstract-blurred-event-exhibition-with-people-background-business-convention-show-concept.jpg?s=2048x2048&w=is&k=20&c=sO7rKJhCkCOqP94c4_Jut3BC4e2vpUI8_SwwNLwTXgs=", "Lucknow", "Wedding", "Both", 2550, 199000),
                    new Hall(null, "Amber Bloom Banquets", "Wedding","/images/trending1.jpg", "Delhi", "Wedding", "Veg", 1150, 255000),
                    new Hall(null, "Sunset Terrace", "Wedding","/images/trending2.jpeg",  "Mumbai", "Wedding", "Non-Veg", 900, 110000),
                    new Hall(null, "The White Palace", "Wedding","/images/trending4.jpeg",   "Bangalore", "Wedding", "Both", 1800, 155000),
                    new Hall(null, "The Summit Hall", "Wedding", "/images/trending5.jpeg",  "Pune", "Wedding", "Non-Veg", 1900, 100000),
                    new Hall(null, "The  Vernda", "Wedding","/images/trending3.jpeg",   "Bangalore", "Wedding", "Both", 8800, 165000),
                    new Hall(null, "The Regent's Club", "Wedding","https://media.istockphoto.com/id/1455919586/photo/the-beautiful-decorations-cultural-program.jpg?s=1024x1024&w=is&k=20&c=J-63Pn0mhVhPT9yUBbogYGIRVGya6PTJngwpxsSgNHI=",  "Delhi", "Wedding", "Veg", 1150, 155000),
                    new Hall(null, "The Onyx Suite", "Wedding", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop", "Pune", "Wedding", "Non-Veg", 1900, 100000),
                    new Hall(null, "Ocean View", "Wedding", "https://media.istockphoto.com/id/2238876846/photo/indian-traditional-wedding-ceremony-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=p7jD-TSxnGigDfhJvvdaatuwFKPQxuQnt8DLNOVqX7Y=",  "Bangalore", "Wedding", "Both", 1800, 175000),
                    new Hall(null, "Royal Gardens", "Wedding", "https://media.istockphoto.com/id/2195948319/photo/indian-wedding-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=yQ31b_IaY_NVQQMWALmqtfu9cr6siqsdEaXpXccRSsQ=",  "Chennai", "Wedding", "Veg", 1450, 150000),
                    new Hall(null, "The Floral Canopy", "Wedding", "https://media.istockphoto.com/id/2196449572/photo/indian-wedding-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=5NclCrOw8x3wVX9o5Mwzr-aqP6P3QCW6tvPspqVtrCI=","Chennai", "Wedding", "Both", 1600, 110000),
                    new Hall(null, "The Lotus Pavilion", "Wedding", "https://images.pexels.com/photos/33417234/pexels-photo-33417234.jpeg", "Mumbai", "Wedding", "Veg", 2000, 160000),
                    new Hall(null, "The Royal Dias", "Wedding","https://images.pexels.com/photos/32994470/pexels-photo-32994470.jpeg",  "Lucknow", "Wedding", "Non-Veg", 1000, 255000),
                    new Hall(null, "The Forum", "Corporate Event","https://images.pexels.com/photos/50675/banquet-wedding-society-deco-50675.jpeg",  "Bangalore", "Corporate Event", "Veg", 1350, 300000),
                    new Hall(null, "The Convetion Plaza", "Corporate Event ",    "https://media.istockphoto.com/id/1133692578/photo/exhibition-event-hall-blur-background-of-trade-show-business-world-or-international-expo.jpg?s=2048x2048&w=is&k=20&c=YTnHhSaD9oWH-QWORQ1V8iPxsTwug3msm4VGGReVrlo=",  "Delhi", "Corporate Event", "Both", 700, 200000),
                    new Hall(null, "The Grand Theatre", "Corporate Event","https://media.istockphoto.com/id/1125802247/photo/abstract-blurred-image-of-conference-and-presentation-in-the-conference-hall.jpg?s=2048x2048&w=is&k=20&c=AvtzuNwftNaKMtDbB5aML2x441WxFvUn3r6jovt3Zeo=",  "Pune", "Corporate Event", "Veg", 2250, 150000),
                    new Hall(null, "The Exhibition Hall", "Corporate Event",    "https://media.istockphoto.com/id/1059441412/photo/abstract-blurred-event-exhibition-with-people-background-business-convention-show-concept.jpg?s=2048x2048&w=is&k=20&c=sO7rKJhCkCOqP94c4_Jut3BC4e2vpUI8_SwwNLwTXgs=",  "Chennai", "Corporate Event", "Non-Veg", 1880, 150000),
                    new Hall(null, "The Garden Arch", "Corporate Event","https://media.istockphoto.com/id/530686143/photo/group-of-conference-participants-standing-in-lobby-of-conference-center-socializing-during.jpg?s=2048x2048&w=is&k=20&c=silyy0mNTULmxji7j5SkdsJfBVxhWBWMBcC27JJosOM=",  "Lucknow", "Corporate Event", "Both", 550, 180000),
                    new Hall(null, "The Midnight Blue Hall", "Birthday Party","https://media.istockphoto.com/id/2183824556/photo/three-candles-on-a-candlestick-burning-at-a-party.jpg?s=1024x1024&w=is&k=20&c=VBBFeOf2AlQFYWiNnRhFC4zjppxfb_H4yNhf4yKTQuc=",  "Bangalore", "Birthday Party", "Veg", 950, 130000),
                    new Hall(null, "The Regency", "Birthday Party",   "https://media.istockphoto.com/id/961798406/photo/stylish-champagne-glasses-and-food-appetizers-on-table-at-wedding-reception-luxury-catering-at.jpg?s=2048x2048&w=is&k=20&c=Ijq2AuCY88HyIHk3VLlNJH85l9IQdwNNuDfaONVVqp4=",     "Delhi", "Birthday Party", "Both", 700, 120000),
                    new Hall(null, "The Celebration Arch", "Birthday Party",  "https://media.istockphoto.com/id/1163718652/photo/delicious-wedding-reception-birthday-cake-on-a-background-balloons-party-decor-copy-space.jpg?s=2048x2048&w=is&k=20&c=0CsKiE2O2oy8xAf8iAh8vffGuHFl2csA32Kq4c5NKFo=",  "Pune", "Birthday Party", "Veg", 550, 950000),
                    new Hall(null, "The Majestic", "Birthday Party","https://media.istockphoto.com/id/1454170096/photo/pink-decoration-with-balloons-and-swans-for-birthday-party.jpg?s=2048x2048&w=is&k=20&c=IdiOyGrGuYN8k_I4B6Ot8UiHH5OwxYX1PdNE5AQP3Ow=", "Mumbai", "Birthday Party", "Both", 900, 130000),
                    new Hall(null, "The Golden Dias", "Engagement", "https://media.istockphoto.com/id/2197936306/photo/birthday-party-decorations-three-tiered-cake-with-pink-roses-happy-birthday-text-topper-and.jpg?s=2048x2048&w=is&k=20&c=P-WMfPd38giHrhErH46ZYeldsDggOmHyDxxPwTh09O4=",  "Delhi", "Engagement", "Non-Veg", 800, 150000),
                    new Hall(null, "The Pinnacle", "Engagement", "https://media.istockphoto.com/id/2172503802/photo/romantic-wedding-ceremony-on-the-sunny-beach.jpg?s=2048x2048&w=is&k=20&c=NzObe4VVkhbNU-I_AiEj4CsCIvx9JVMCzq2hxyLYblE=", "Mumbai", "Engagement", "Both", 550, 180000),
                    new Hall(null, "The Celebration Wall", "Engagement", "https://media.istockphoto.com/id/2238874796/photo/indian-traditional-wedding-ceremony-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=3QWPzilepCIeOQZmF6Svf89G6C0WVc2wVdYn7FGDNYQ=", "Mumbai", "Engagement", "Both", 900, 130000),
                    new Hall(null, "The Festive Entrance", "Engagement","https://media.istockphoto.com/id/2172827163/photo/wedding-setty-back-with-floral-decorations.jpg?s=2048x2048&w=is&k=20&c=B90kHcL20hk_-VMNysUVCfyycsxS5Y1vT9022iMENPA=",   "Lucknow", "Engagement", "Non-Veg", 980, 150000),
                    new Hall(null, "The Networking Hub", "Engagement",   "https://media.istockphoto.com/id/996257874/photo/wedding-table-with-flower-compositions.jpg?s=1024x1024&w=is&k=20&c=Prx9f4FEJvBNgJR7F1VKgzmgc3fIMqWRCFoNLsvUbbM=",  "Chennayi", "Engagement", "Both", 550, 180000)
                );
                hallRepository.saveAll(initialHalls);
                System.out.println("Initial Hall data has been populated.");
            } else {
                System.out.println("Hall table already contains data. Skipping population.");
            }

            // --- 2. PLANNER DATA INITIALIZATION ---
            if (plannerRepository.count() == 0) {
                System.out.println("Populating Planner data...");
                
                // Planner 1: Priya Singh
                Planner p1 = new Planner();
                p1.setName("Priya Singh");
                p1.setStartingPrice(15000.00); 
                p1.setRating(4.9);
                p1.setSpecialization("Luxury Events");
                p1.setImageLink("https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"); // Profile photo
                p1.setContact("+919123456780"); 
                plannerRepository.save(p1);

                // Planner 2: Rajesh Kumar
                Planner p2 = new Planner();
                p2.setName("Rajesh Kumar");
                p2.setStartingPrice(10000.00);
                p2.setRating(4.7);
                p2.setSpecialization("Destination Weddings");
                p2.setImageLink("https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"); // Profile photo
                p2.setContact("+919012345678");
                plannerRepository.save(p2);
                
                System.out.println("Planner data initialized successfully!");
            }
        
    
    
    // --- 3. PHOTOGRAPHER DATA INITIALIZATION ---
            if (photographerRepository.count() == 0) {
                System.out.println("Populating Photographer data...");
                
                // --- Photographer 1: Riya Photography ---
                Photographer p1 = new Photographer();
                p1.setName("Riya Photography");
                p1.setRating(4.8);
                p1.setStartingPrice(28000.00); // 💥 FIX: .00 added for double
                p1.setPhone("9876543210");
                p1.setSpecialization("Specializes in luxury wedding and corporate photography."); 
                p1.setImageLink("https://images.pexels.com/photos/4240505/pexels-photo-4240505.jpeg?auto=compress&cs=tinysrgb&w=600");
                p1.setEventTypes(Arrays.asList("Wedding", "Corporate Event"));
                p1.setAbout("With over 10 years of experience in wedding and corporate photography, I aim to capture the most precious moments of your special day. My approach combines artistic vision with technical expertise to create timeless memories that you'll cherish forever.");
                p1.setWorkingHours(Arrays.asList("09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM","09:00 PM","10:00 PM","11:00 PM","12:00 PM"));
                p1.setPortfolio(Arrays.asList(
                    "https://media.istockphoto.com/id/1399000012/photo/guests-throwing-confetti-over-bride-and-groom-as-they-walk-past-after-their-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=G8zuGJUuEK9HXwx1xEYPYwrcajt8r3K8nSVFeEzLHFY=",
                    "https://media.istockphoto.com/id/1190043570/photo/happy-wedding-photography-of-bride-and-groom-at-wedding-ceremony-wedding-tradition-sprinkled.jpg?s=1024x1024&w=is&k=20&c=dEnXwMGSpfySpEepRWDVY_c7pHyhOZpv2RG5_QggqzY=",
                    "https://media.istockphoto.com/id/1397574789/photo/together-we-make-the-world-better.jpg?s=1024x1024&w=is&k=20&c=8caxy0OpDGOc5qA-M-JpMN4cxVMOFJrXgfOASXk43Qo=",
                    "https://media.istockphoto.com/id/2195984095/photo/indian-couples-holding-hands-close-up.jpg?s=2048x2048&w=is&k=20&c=aRpmdV_vJO-e59HPzOgeYtMfOzjOKL9vFxMuE9k0Gyo=",
                    "https://media.istockphoto.com/id/2200874881/photo/loving-groom-looking-at-bride-in-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=NnZkm8DnV2igmuuMx1APvrY7z1HO1nKiog0ADQM7hQs=",
                    "https://media.istockphoto.com/id/2200577335/photo/happy-bride-showing-bangles-to-groom-in-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=P0t0fbgKxykXhksxFluDRFriFVDa54ycV171ylyboGw=",
                    "https://media.istockphoto.com/id/821463698/photo/microphone-over-the-abstract-blurred-photo-of-conference-hall-or-seminar-room-with-attendee.jpg?s=1024x1024&w=is&k=20&c=nQMCyAx-XkqX69RolGa2THHi8XJSdthHdZ9izvArrcc="
                ));
                photographerRepository.save(p1);

                // --- Photographer 2: Rajesh Photography ---
                Photographer p2 = new Photographer();
                p2.setName("Rajesh Photography");
                p2.setRating(4.9);
                p2.setStartingPrice(35000.00); // 💥 FIX: .00 added for double
                p2.setPhone("8765432109");
                p2.setSpecialization("Expert in Corporate event and portrait photography.");
                p2.setImageLink("https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600");
                p2.setEventTypes(Arrays.asList("Corporate Event", "Portrait"));
                p2.setAbout("Specializing in portrait and event photography with a creative approach to storytelling through images.");
                p2.setWorkingHours(Arrays.asList("10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"));
        
                p2.setPortfolio(Arrays.asList(
                    "https://media.istockphoto.com/id/1187919612/photo/commitment.jpg?s=2048x2048&w=is&k=20&c=vTG_PHFWQuG2cOKhC94Umf22os5SYYlqIBdA84oC5n0=",
                    "https://media.istockphoto.com/id/893123282/photo/wedding-champagne-toast-stock-image.jpg?s=2048x2048&w=is&k=20&c=Mt9OAW6_IvMQKyuf9GtMzyjlHGt45nfIFhvdKpRnAMo=",
                    "https://media.istockphoto.com/id/486879530/photo/happy-indian-couple-at-their-wedding.jpg?s=2048x2048&w=is&k=20&c=fzH7OAy9tuPnvsiUqfz8bzO5kOWcLrJuCr_McSbYPF8=",
                    "https://media.istockphoto.com/id/1454343788/photo/closeup-of-the-groom-and-the-bride-holding-hands-during-a-traditional-indian-wedding.jpg?s=2048x2048&w=is&k=20&c=vNxV-p1JuGUn-DePdtcrNXDzqr1cvpDugaJpIjfGQmA=",
                    "https://media.istockphoto.com/id/521046338/photo/bokeh-light-and-blurred-people-in-convention-hall.jpg?s=2048x2048&w=is&k=20&c=CLcOXz6g37siDoh5DSUNc-RH3wY7moz1oIJuxnhxKj4=",
                    "https://images.pexels.com/photos/1020011/pexels-photo-1020011.jpeg?auto=compress&cs=tinysrgb&w=600",
                    "https://images.pexels.com/photos/2240767/pexels-photo-2240767.jpeg?auto=compress&cs=tinysrgb&w=600" 
                ));
                photographerRepository.save(p2);

                // --- Photographer 3: Chandan Photography ---
                Photographer p3 = new Photographer();
                p3.setName("Chandan Photography");
                p3.setRating(4.7);
                p3.setStartingPrice(30000.00); // 💥 FIX: .00 added for double
                p3.setPhone("5665422109");
                p3.setSpecialization("Expert in engagement, wedding and bday photography.");
                p3.setImageLink("https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=600"); 
                p3.setEventTypes(Arrays.asList("Engagement", "Wedding", "Birthday Party")); // 'Bday' ko 'Birthday Party' assume kiya
                p3.setAbout("Specializing in portrait and event photography ,capturing life's most precious moments with an artistic eye and a passion for storytelling.");
                p3.setWorkingHours(Arrays.asList("10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"));
            
                p3.setPortfolio(Arrays.asList(
                    "https://media.istockphoto.com/id/1215683644/photo/friends-celebration-birthday-with-cake.jpg?s=2048x2048&w=is&k=20&c=WhEZeIT2eG2cmIPO1o5WNYXudRjOEK3nTiqMOtzw_GA=",
                    "https://media.istockphoto.com/id/1173607293/photo/100-years-old-birthday-cake-to-old-woman.jpg?s=2048x2048&w=is&k=20&c=dlpQ5XkT9v_NFA7icrN9F5wBxJEknxJt1tJhAaH-LGQ=",
                    "https://media.istockphoto.com/id/1002144354/photo/friends-presenting-birthday-cake-to-girl.jpg?s=2048x2048&w=is&k=20&c=FAr-blR20QVjKvgDdwOXMb7LFntO3I6oH1YMrEJGnhc=",
                    "https://media.istockphoto.com/id/1468883993/photo/wedding-ceremony-of-the-newlyweds-on-the-glade.jpg?s=2048x2048&w=is&k=20&c=L0IwnX99DKP_NOnp8pWWJnvZJhRBeyVhi3ZeRr3Ztfc=",
                    "https://media.istockphoto.com/id/1211496765/photo/indian-bride-hands-with-henna-tattoo-ready-for-traditional-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=FZr2GQ7GPzPg8qun-Y-TdAm9YcZ9UY6FHZn7lj7ZcLc="
                ));
                photographerRepository.save(p3);

                // --- Photographer 4: Aashutosh Photography ---
                Photographer p4 = new Photographer();
                p4.setName("Aashutosh Photography");
                p4.setRating(4.9);
                p4.setStartingPrice(40000.00); // 💥 FIX: .00 added for double
                p4.setPhone("8765432109");
                p4.setSpecialization("Expert all type of photography.");
                p4.setImageLink("https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=600");
                p4.setEventTypes(Arrays.asList("Wedding", "Engagement", "Birthday Party", "Corporate Event", "Portrait"));
                p4.setAbout("Specializing in all type of photography, my goal is to provide a seamless and enjoyable photography experience,resulting in stunning visuals that you'll cherish for a lifetime.");
                p4.setWorkingHours(Arrays.asList("09:00 AM","10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM", "05:00 PM","07:00 PM","08:00 PM","09:00 PM","10:00 PM"));
                p4.setLocation("Mumbai"); 
                p4.setPortfolio(Arrays.asList(
                     "https://media.istockphoto.com/id/655007524/photo/friends-give-a-birthday-cake-to-their-friend.jpg?s=2048x2048&w=is&k=20&c=Pz-K99DTjjQwEvMnhXPqBIaB3eSlUUla-ca-ky0SyYI=",
                     "https://media.istockphoto.com/id/907380874/photo/excited-young-woman-gets-birthday-cake.jpg?s=2048x2048&w=is&k=20&c=3vTwmedQ1W1r1GfO-hFClxBQ4HQp-BP5GyZAarEwKCQ=",
                     "https://media.istockphoto.com/id/851103324/photo/closeup-groom-and-bride-are-holding-hands-at-wedding-day-ang-show-rings-concept-of-love-family.jpg?s=1024x1024&w=is&k=20&c=M79IQgooL3hnBw8zznW3mQhtCeI2V5x5FBj4gFPJt5A=",
                     "https://media.istockphoto.com/id/1446478773/photo/business-people-are-talking-together-during-a-teambuilding-event-in-a-luxury-restaurant.jpg?s=1024x1024&w=is&k=20&c=wnxvvWERYGtVTfrydCfUblJjIZKUSRw-vkpOOsuWzXM=",
                     "https://media.istockphoto.com/id/2195984093/photo/indian-couples-holding-hands-close-up.jpg?s=2048x2048&w=is&k=20&c=YRJR-wk4oRgwiEtMGGmsssE-8yDBdvgNlo7qJSJMSPw="
                ));
                
              photographerRepository.save(p4);

                // Sabhi photographers ko ek list mein daalein
        System.out.println("Photographer data initialised successfully!");
    }
            
            // --- Initialization Logic Ends ---
        }; // <-- YAHAN SEMICOLON (;) LAGANA ZAROORI HAI
    }
}
          


// File Location: src/main/java/com/eventmate/backend/BackendApplication.java
// package com.eventmate.backend;
// import java.util.Arrays;
// import java.util.List;

// import org.springframework.boot.CommandLineRunner; // Yeh pehle se ho sakta hai
// import org.springframework.boot.SpringApplication; // Yeh pehle se ho sakta hai
// import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.context.annotation.Bean;

// import com.eventmate.backend.models.Hall;
// import com.eventmate.backend.models.Photographer;
// import com.eventmate.backend.models.Planner; // Import karein
// import com.eventmate.backend.repositories.HallRepository;
// import com.eventmate.backend.repositories.PhotographerRepository;
// import com.eventmate.backend.repositories.PlannerRepository;
// @SpringBootApplication
// public class BackendApplication {
//     public static void main(String[] args) {
//         SpringApplication.run(BackendApplication.class, args);
//     }

//     // This bean will run on application startup
//     @Bean
//     CommandLineRunner initDatabase(HallRepository hallRepository) {
//         return args -> {
//             // Check if the database is already populated
//             if (hallRepository.count() == 0) {
//                 System.out.println("Database is empty. Populating with initial data...");

//                 List<Hall> initialHalls = Arrays.asList(
//                     new Hall(null, "The Skyview Terrace", "Wedding","https://images.pexels.com/photos/3835638/pexels-photo-3835638.jpeg",  "Delhi", "Wedding", "Veg", 1500, 150000),
//                     new Hall(null, "Sunset vista", "Engagement", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop", "Bangalore", "Engagement", "Non-Veg", 1000, 75000),
//                     new Hall(null, "Azure Villa", "Corporate Event", "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop", "Bangalore", "Corporate Event", "Both", 800, 85000),
//                     new Hall(null, "The Sovereign Hall", "Wedding", "https://images.unsplash.com/photo-1542665952-14513db15293?q=80&w=2070&auto=format&fit=crop", "Lucknow", "Wedding", "Veg", 2000, 100000),
//                     new Hall(null, "The Legacy Hall", "Corporate Event", "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop", "Delhi", "Corporate Event", "Both", 600, 110000),
                   
//                     new Hall(null, "The Golden Atrium", "Wedding", "https://media.istockphoto.com/id/2153497521/photo/moroccan-cultural-wedding-organization.jpg?s=2048x2048&w=is&k=20&c=6-0YPLf-u_A8y4dEO9AuzKg1A82mdVFS6F-V-pQw2Cw= ","Mumbai", "Wedding", "Veg", 2200, 160000),
//                     new Hall(null, "The Empress Hall", "Wedding", "https://media.istockphoto.com/id/450955083/photo/wedding.jpg?s=1024x1024&w=is&k=20&c=NrSTxwM01CQ6k5z_R_EJ0cEjHAZ4c8essmpIzRNwdnM=", "Lucknow", "Wedding", "Non-Veg", 1500, 150000),
//                     new Hall(null, "The Celebration Suite", "Birthday Party", "https://media.istockphoto.com/id/2034042466/photo/beautiful-table-decorated-for-15th-birthday.jpg?s=2048x2048&w=is&k=20&c=5l-j8nDFAuLiFAhGDs2-T-OFz3DgwOguQqUkaSMd6zI=", "Bangalore", "Birthday Party", "Veg", 550, 55000),
//                     new Hall(null, "The Lagoon Deck", "Engagement", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop", "Delhi", "Engagement", "Both", 700, 200000),
//                     new Hall(null, "The Serene Garden", "Engagement", "https://media.istockphoto.com/id/2238874796/photo/indian-traditional-wedding-ceremony-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=3QWPzilepCIeOQZmF6Svf89G6C0WVc2wVdYn7FGDNYQ=", "Pune", "Engagement", "Veg", 950, 250000),
                   
//                     new Hall(null, "The Grand Buffet", "Corporate Event", "https://media.istockphoto.com/id/961798406/photo/stylish-champagne-glasses-and-food-appetizers-on-table-at-wedding-reception-luxury-catering-at.jpg?s=2048x2048&w=is&k=20&c=Ijq2AuCY88HyIHk3VLlNJH85l9IQdwNNuDfaONVVqp4=", "Mumbai", "Corporate Event", "Both", 900, 155000),
//                     new Hall(null, "The Monarch Hall", "Birthday Party", "https://media.istockphoto.com/id/1446334741/photo/desserts-and-table-decorations-for-parties-and-celebrations-photography-of-snacks-and.jpg?s=2048x2048&w=is&k=20&c=W_T4nsYSZJU1YEw5x2JHzIrNPw_6Hxuegd4VTAzyBxY=", "Chennai", "Birthday Party", "Non-Veg", 1100, 165000),
//                     //13
//                     new Hall(null, "The Beachside Canopy", "Wedding", "https://media.istockphoto.com/id/1059441412/photo/abstract-blurred-event-exhibition-with-people-background-business-convention-show-concept.jpg?s=2048x2048&w=is&k=20&c=sO7rKJhCkCOqP94c4_Jut3BC4e2vpUI8_SwwNLwTXgs=", "Lucknow", "Wedding", "Both", 2550, 199000),
// //trending 
//                       new Hall(null, "Amber Bloom Banquets", "Wedding","/images/trending1.jpg", "Delhi", "Wedding", "Veg", 1150, 255000),
//                     new Hall(null, "Sunset Terrace", "Wedding","/images/trending2.jpeg",  "Mumbai", "Wedding", "Non-Veg", 900, 110000),
//                     new Hall(null, "The White Palace", "Wedding","/images/trending4.jpeg",   "Bangalore", "Wedding", "Both", 1800, 155000),
//                    new Hall(null, "The Summit Hall", "Wedding", "/images/trending5.jpeg",  "Pune", "Wedding", "Non-Veg", 1900, 100000),
//                     new Hall(null, "The  Vernda", "Wedding","/images/trending3.jpeg",   "Bangalore", "Wedding", "Both", 8800, 165000),


                    
//                     new Hall(null, "The Regent's Club", "Wedding","https://media.istockphoto.com/id/1455919586/photo/the-beautiful-decorations-cultural-program.jpg?s=1024x1024&w=is&k=20&c=J-63Pn0mhVhPT9yUBbogYGIRVGya6PTJngwpxsSgNHI=",  "Delhi", "Wedding", "Veg", 1150, 155000),
//                     new Hall(null, "The Onyx Suite", "Wedding", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop", "Pune", "Wedding", "Non-Veg", 1900, 100000),
//                     new Hall(null, "Ocean View", "Wedding", "https://media.istockphoto.com/id/2238876846/photo/indian-traditional-wedding-ceremony-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=p7jD-TSxnGigDfhJvvdaatuwFKPQxuQnt8DLNOVqX7Y=",  "Bangalore", "Wedding", "Both", 1800, 175000),
//                     new Hall(null, "Royal Gardens", "Wedding", "https://media.istockphoto.com/id/2195948319/photo/indian-wedding-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=yQ31b_IaY_NVQQMWALmqtfu9cr6siqsdEaXpXccRSsQ=",  "Chennai", "Wedding", "Veg", 1450, 150000),
//                     new Hall(null, "The Floral Canopy", "Wedding", "https://media.istockphoto.com/id/2196449572/photo/indian-wedding-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=5NclCrOw8x3wVX9o5Mwzr-aqP6P3QCW6tvPspqVtrCI=","Chennai", "Wedding", "Both", 1600, 110000),
                    
//                     new Hall(null, "The Lotus Pavilion", "Wedding", "https://images.pexels.com/photos/33417234/pexels-photo-33417234.jpeg", "Mumbai", "Wedding", "Veg", 2000, 160000),
//                     new Hall(null, "The Royal Dias", "Wedding","https://images.pexels.com/photos/32994470/pexels-photo-32994470.jpeg",  "Lucknow", "Wedding", "Non-Veg", 1000, 255000),
                    
//                     new Hall(null, "The Forum", "Corporate Event","https://images.pexels.com/photos/50675/banquet-wedding-society-deco-50675.jpeg",  "Bangalore", "Corporate Event", "Veg", 1350, 300000),
//                     new Hall(null, "The Convetion Plaza", "Corporate Event ",    "https://media.istockphoto.com/id/1133692578/photo/exhibition-event-hall-blur-background-of-trade-show-business-world-or-international-expo.jpg?s=2048x2048&w=is&k=20&c=YTnHhSaD9oWH-QWORQ1V8iPxsTwug3msm4VGGReVrlo=",  "Delhi", "Corporate Event", "Both", 700, 200000),
//                     new Hall(null, "The Grand Theatre", "Corporate Event","https://media.istockphoto.com/id/1125802247/photo/abstract-blurred-image-of-conference-and-presentation-in-the-conference-hall.jpg?s=2048x2048&w=is&k=20&c=AvtzuNwftNaKMtDbB5aML2x441WxFvUn3r6jovt3Zeo=",  "Pune", "Corporate Event", "Veg", 2250, 150000),
//                    // new Hall(null, "The Majestic", "Corporate","https://media.istockphoto.com/id/1125802247/photo/abstract-blurred-image-of-conference-and-presentation-in-the-conference-hall.jpg?s=2048x2048&w=is&k=20&c=AvtzuNwftNaKMtDbB5aML2x441WxFvUn3r6jovt3Zeo=", "Mumbai", "Corporate Event", "Both", 900, 13000),
//                     new Hall(null, "The Exhibition Hall", "Corporate Event",    "https://media.istockphoto.com/id/1059441412/photo/abstract-blurred-event-exhibition-with-people-background-business-convention-show-concept.jpg?s=2048x2048&w=is&k=20&c=sO7rKJhCkCOqP94c4_Jut3BC4e2vpUI8_SwwNLwTXgs=",  "Chennai", "Corporate Event", "Non-Veg", 1880, 150000),
//                     new Hall(null, "The Garden Arch", "Corporate Event","https://media.istockphoto.com/id/530686143/photo/group-of-conference-participants-standing-in-lobby-of-conference-center-socializing-during.jpg?s=2048x2048&w=is&k=20&c=silyy0mNTULmxji7j5SkdsJfBVxhWBWMBcC27JJosOM=",  "Lucknow", "Corporate Event", "Both", 550, 180000),

//                     new Hall(null, "The Midnight Blue Hall", "Birthday Party","https://media.istockphoto.com/id/2183824556/photo/three-candles-on-a-candlestick-burning-at-a-party.jpg?s=1024x1024&w=is&k=20&c=VBBFeOf2AlQFYWiNnRhFC4zjppxfb_H4yNhf4yKTQuc=",  "Bangalore", "Birthday Party", "Veg", 950, 130000),
//                     new Hall(null, "The Regency", "Birthday Party",   "https://media.istockphoto.com/id/961798406/photo/stylish-champagne-glasses-and-food-appetizers-on-table-at-wedding-reception-luxury-catering-at.jpg?s=2048x2048&w=is&k=20&c=Ijq2AuCY88HyIHk3VLlNJH85l9IQdwNNuDfaONVVqp4=",     "Delhi", "Birthday Party", "Both", 700, 120000),
//                     new Hall(null, "The Celebration Arch", "Birthday Party",  "https://media.istockphoto.com/id/1163718652/photo/delicious-wedding-reception-birthday-cake-on-a-background-balloons-party-decor-copy-space.jpg?s=2048x2048&w=is&k=20&c=0CsKiE2O2oy8xAf8iAh8vffGuHFl2csA32Kq4c5NKFo=",  "Pune", "Birthday Party", "Veg", 550, 950000),
//                     new Hall(null, "The Majestic", "Birthday Party","https://media.istockphoto.com/id/1454170096/photo/pink-decoration-with-balloons-and-swans-for-birthday-party.jpg?s=2048x2048&w=is&k=20&c=IdiOyGrGuYN8k_I4B6Ot8UiHH5OwxYX1PdNE5AQP3Ow=", "Mumbai", "Birthday Party", "Both", 900, 130000),
                    
//                     new Hall(null, "The Golden Dias", "Engagement", "https://media.istockphoto.com/id/2197936306/photo/birthday-party-decorations-three-tiered-cake-with-pink-roses-happy-birthday-text-topper-and.jpg?s=2048x2048&w=is&k=20&c=P-WMfPd38giHrhErH46ZYeldsDggOmHyDxxPwTh09O4=",  "Delhi", "Engagement", "Non-Veg", 800, 150000),
//                     new Hall(null, "The Pinnacle", "Engagement", "https://media.istockphoto.com/id/2172503802/photo/romantic-wedding-ceremony-on-the-sunny-beach.jpg?s=2048x2048&w=is&k=20&c=NzObe4VVkhbNU-I_AiEj4CsCIvx9JVMCzq2hxyLYblE=", "Mumbai", "Engagement", "Both", 550, 180000),

//                     new Hall(null, "The Celebration Wall", "Engagement", "https://media.istockphoto.com/id/2238874796/photo/indian-traditional-wedding-ceremony-interiors-and-decorations.jpg?s=2048x2048&w=is&k=20&c=3QWPzilepCIeOQZmF6Svf89G6C0WVc2wVdYn7FGDNYQ=", "Mumbai", "Engagement", "Both", 900, 130000),
                    
//                     new Hall(null, "The Festive Entrance", "Engagement","https://media.istockphoto.com/id/2172827163/photo/wedding-setty-back-with-floral-decorations.jpg?s=2048x2048&w=is&k=20&c=B90kHcL20hk_-VMNysUVCfyycsxS5Y1vT9022iMENPA=",   "Lucknow", "Engagement", "Non-Veg", 980, 150000),
//                     new Hall(null, "The Networking Hub", "Engagement",   "https://media.istockphoto.com/id/996257874/photo/wedding-table-with-flower-compositions.jpg?s=1024x1024&w=is&k=20&c=Prx9f4FEJvBNgJR7F1VKgzmgc3fIMqWRCFoNLsvUbbM=",  "Chennayi", "Engagement", "Both", 550, 180000)

//                 );
//                 hallRepository.saveAll(initialHalls);
//                 System.out.println("Initial data has been populated.");
//             } else {
//                 System.out.println("Database already contains data. Skipping population.");
//             }
//         };
//     }

//     // --- YEH POORA NAYA BEAN ADD KAREIN ---
//     @Bean
//     CommandLineRunner initPhotographers(PhotographerRepository photographerRepository) {
//         return args -> {
//             // Check karein ki photographers table khaali hai ya nahi
//             if (photographerRepository.count() == 0) {
//                 System.out.println("Photographers table is empty. Populating with initial photographer data...");

//                 // --- Photographer 1: Riya Photography ---
//                 Photographer p1 = new Photographer();
//                 p1.setName("Riya Photography");
//                 p1.setRating(4.8);
//                 p1.setStartingPrice(28000); // Price ko number mein convert karein
//                 p1.setPhone("9876543210");
//                 p1.setSpecialization("Specializes in wedding and corporate photography."); // Description ko specialization mein daal rahe hain
//                 p1.setImageLink("https://images.pexels.com/photos/4240505/pexels-photo-4240505.jpeg?auto=compress&cs=tinysrgb&w=600"); // Pehli image ko profile image banayein
//                 p1.setEventTypes(Arrays.asList("Wedding", "Corporate Event"));
//                 p1.setPortfolio(Arrays.asList(
//                     "https://media.istockphoto.com/id/1399000012/photo/guests-throwing-confetti-over-bride-and-groom-as-they-walk-past-after-their-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=G8zuGJUuEK9HXwx1xEYPYwrcajt8r3K8nSVFeEzLHFY=",
//                     "https://media.istockphoto.com/id/1190043570/photo/happy-wedding-photography-of-bride-and-groom-at-wedding-ceremony-wedding-tradition-sprinkled.jpg?s=1024x1024&w=is&k=20&c=dEnXwMGSpfySpEepRWDVY_c7pHyhOZpv2RG5_QggqzY=",
//                     "https://media.istockphoto.com/id/1397574789/photo/together-we-make-the-world-better.jpg?s=1024x1024&w=is&k=20&c=8caxy0OpDGOc5qA-M-JpMN4cxVMOFJrXgfOASXk43Qo=",
//                     "https://media.istockphoto.com/id/2195984095/photo/indian-couples-holding-hands-close-up.jpg?s=2048x2048&w=is&k=20&c=aRpmdV_vJO-e59HPzOgeYtMfOzjOKL9vFxMuE9k0Gyo=",
//                     "https://media.istockphoto.com/id/2200874881/photo/loving-groom-looking-at-bride-in-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=NnZkm8DnV2igmuuMx1APvrY7z1HO1nKiog0ADQM7hQs=",
//                     "https://media.istockphoto.com/id/2200577335/photo/happy-bride-showing-bangles-to-groom-in-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=P0t0fbgKxykXhksxFluDRFriFVDa54ycV171ylyboGw=",
//                     "https://media.istockphoto.com/id/821463698/photo/microphone-over-the-abstract-blurred-photo-of-conference-hall-or-seminar-room-with-attendee.jpg?s=1024x1024&w=is&k=20&c=nQMCyAx-XkqX69RolGa2THHi8XJSdthHdZ9izvArrcc="
//                 ));
//                 p1.setAbout("With over 10 years of experience in wedding and corporate photography, I aim to capture the most precious moments of your special day. My approach combines artistic vision with technical expertise to create timeless memories that you'll cherish forever.");
//                 p1.setWorkingHours(Arrays.asList("09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM","09:00 PM","10:00 PM","11:00 PM","12:00 PM")); // "9:00pm" ko "09:00 PM" kar diya
//                 p1.setLocation("Delhi"); // Location add kar diya

//                 // --- Photographer 2: Rajesh Photography ---
//                 Photographer p2 = new Photographer();
//                 p2.setName("Rajesh Photography");
//                 p2.setRating(4.9);
//                 p2.setStartingPrice(35000);
//                 p2.setPhone("8765432109");
//                 p2.setSpecialization("Expert in Corporate event and portrait photography.");
//                 p2.setImageLink("https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600");
//                 // Note: " Corporate Event" mein shuru ka space hata diya
//                 p2.setEventTypes(Arrays.asList("Corporate Event", "Portrait"));
//                 p2.setPortfolio(Arrays.asList(
//                     "https://media.istockphoto.com/id/1187919612/photo/commitment.jpg?s=2048x2048&w=is&k=20&c=vTG_PHFWQuG2cOKhC94Umf22os5SYYlqIBdA84oC5n0=",
//                     "https://media.istockphoto.com/id/893123282/photo/wedding-champagne-toast-stock-image.jpg?s=2048x2048&w=is&k=20&c=Mt9OAW6_IvMQKyuf9GtMzyjlHGt45nfIFhvdKpRnAMo=",
//                     "https://media.istockphoto.com/id/486879530/photo/happy-indian-couple-at-their-wedding.jpg?s=2048x2048&w=is&k=20&c=fzH7OAy9tuPnvsiUqfz8bzO5kOWcLrJuCr_McSbYPF8=",
//                     "https://media.istockphoto.com/id/1454343788/photo/closeup-of-the-groom-and-the-bride-holding-hands-during-a-traditional-indian-wedding.jpg?s=2048x2048&w=is&k=20&c=vNxV-p1JuGUn-DePdtcrNXDzqr1cvpDugaJpIjfGQmA=",
//                     "https://media.istockphoto.com/id/521046338/photo/bokeh-light-and-blurred-people-in-convention-hall.jpg?s=2048x2048&w=is&k=20&c=CLcOXz6g37siDoh5DSUNc-RH3wY7moz1oIJuxnhxKj4=",
//                     "/images/port2.jpg", // Yeh local path kaam nahi karenge agar deploy kiya
//                     "/images/port3.jpg"  // Inki jagah poora URL daalein
//                 ));
//                 p2.setAbout("Specializing in portrait and event photography with a creative approach to storytelling through images.");
//                 p2.setWorkingHours(Arrays.asList("10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"));
//                 p2.setLocation("Mumbai");

//                 // --- Photographer 3: Chandan Photography ---
//                 Photographer p3 = new Photographer();
//                 p3.setName("Chandan Photography");
//                 p3.setRating(4.7);
//                 p3.setStartingPrice(30000);
//                 p3.setPhone("5665422109");
//                 p3.setSpecialization("Expert in engagement, wedding and bday photography.");
//                 p3.setImageLink("/images/photographer6.jpg"); // Yeh local path hai, poora URL daalein
//                 p3.setEventTypes(Arrays.asList("Engagement", "Wedding", "Bday")); // "Bday" frontend se match nahi karega agar wahaan "Birthday Party" hai
//                 p3.setPortfolio(Arrays.asList(
//                     "https://media.istockphoto.com/id/1215683644/photo/friends-celebration-birthday-with-cake.jpg?s=2048x2048&w=is&k=20&c=WhEZeIT2eG2cmIPO1o5WNYXudRjOEK3nTiqMOtzw_GA=",
//                     "https://media.istockphoto.com/id/1173607293/photo/100-years-old-birthday-cake-to-old-woman.jpg?s=2048x2048&w=is&k=20&c=dlpQ5XkT9v_NFA7icrN9F5wBxJEknxJt1tJhAaH-LGQ=",
//                     "https://media.istockphoto.com/id/1002144354/photo/friends-presenting-birthday-cake-to-girl.jpg?s=2048x2048&w=is&k=20&c=FAr-blR20QVjKvgDdwOXMb7LFntO3I6oH1YMrEJGnhc=",
//                     "/images/port4.jpg",
//                     "https://media.istockphoto.com/id/1468883993/photo/wedding-ceremony-of-the-newlyweds-on-the-glade.jpg?s=2048x2048&w=is&k=20&c=L0IwnX99DKP_NOnp8pWWJnvZJhRBeyVhi3ZeRr3Ztfc=",
//                     "https://media.istockphoto.com/id/1211496765/photo/indian-bride-hands-with-henna-tattoo-ready-for-traditional-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=FZr2GQ7GPzPg8qun-Y-TdAm9YcZ9UY6FHZn7lj7ZcLc=",
//                     "https://media.istockphoto.com/id/1454343788/photo/closeup-of-the-groom-and-the-bride-holding-hands-during-a-traditional-indian-wedding.jpg?s=2048x2048&w=is&k=20&c=vNxV-p1JuGUn-DePdtcrNXDzqr1cvpDugaJpIjfGQmA=",
//                     "https://media.istockphoto.com/id/2200874372/photo/loving-groom-and-bride-in-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=3-yzOCjE4tgRJbmsZjpWEKneJYqRmXd4c_oZ7LSNGHE=",
//                     "https://media.istockphoto.com/id/1468883858/photo/wedding-ceremony-of-the-newlyweds-on-the-glade.jpg?s=2048x2048&w=is&k=20&c=aEE2_dOWCK4F4F261ivqwcDC1m3lFXmwJtngl7RY2G4=",
//                     "https://media.istockphoto.com/id/1468888361/photo/wedding-ceremony-of-the-newlyweds-on-the-glade.jpg?s=1024x1024&w=is&k=20&c=QH_6nug8e433mWH13Y5Bpyvxuk1CG7C5Ieo7GyneE7s=",
//                     "https://media.istockphoto.com/id/1468886519/photo/wedding-ceremony-of-the-newlyweds-on-the-glade.jpg?s=2048x2048&w=is&k=20&c=YhL7QaXOB9o37sIlnhxix7-jWEKL0zbfjQsgJWX6378="
//                 ));
//                 p3.setAbout("Specializing in portrait and event photography ,capturing life's most precious moments with an artistic eye and a passion for storytelling.");
//                 p3.setWorkingHours(Arrays.asList("10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"));
//                 p3.setLocation("Mumbai"); // Location add kar diya

//                 // --- Photographer 4: Aashutosh Photography ---
//                 Photographer p4 = new Photographer();
//                 p4.setName("Aashutosh Photography");
//                 p4.setRating(4.9);
//                 p4.setStartingPrice(40000);
//                 p4.setPhone("8765432109");
//                 p4.setSpecialization("Expert all type of photography.");
//                 p4.setImageLink("https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=600");
//                 p4.setEventTypes(Arrays.asList("Wedding", "Engagement", "Bday", "Corporate Event", "Portrait"));
//                 p4.setPortfolio(Arrays.asList(
//                      "https://media.istockphoto.com/id/655007524/photo/friends-give-a-birthday-cake-to-their-friend.jpg?s=2048x2048&w=is&k=20&c=Pz-K99DTjjQwEvMnhXPqBIaB3eSlUUla-ca-ky0SyYI=",
//                      "https://media.istockphoto.com/id/907380874/photo/excited-young-woman-gets-birthday-cake.jpg?s=2048x2048&w=is&k=20&c=3vTwmedQ1W1r1GfO-hFClxBQ4HQp-BP5GyZAarEwKCQ=",
//                      "https://media.istockphoto.com/id/851103324/photo/closeup-groom-and-bride-are-holding-hands-at-wedding-day-ang-show-rings-concept-of-love-family.jpg?s=1024x1024&w=is&k=20&c=M79IQgooL3hnBw8zznW3mQhtCeI2V5x5FBj4gFPJt5A=",
//                      "https://media.istockphoto.com/id/1446478773/photo/business-people-are-talking-together-during-a-teambuilding-event-in-a-luxury-restaurant.jpg?s=1024x1024&w=is&k=20&c=wnxvvWERYGtVTfrydCfUblJjIZKUSRw-vkpOOsuWzXM=",
//                      "https://media.istockphoto.com/id/2195984093/photo/indian-couples-holding-hands-close-up.jpg?s=2048x2048&w=is&k=20&c=YRJR-wk4oRgwiEtMGGmsssE-8yDBdvgNlo7qJSJMSPw=",
//                      "https://media.istockphoto.com/id/1140927833/photo/bride-and-groom-hands-holding-bridal-showing-wedding-jewelry-ring-bangles.jpg?s=1024x1024&w=is&k=20&c=KkvcBfVjrueR4K1bRSJADZ9ahRd6zbA4zNp5uuexQlk=",
//                      "/images/port5.jpg",
//                      "https://media.istockphoto.com/id/893123282/photo/wedding-champagne-toast-stock-image.jpg?s=2048x2048&w=is&k=20&c=Mt9OAW6_IvMQKyuf9GtMzyjlHGt45nfIFhvdKpRnAMo=",
//                      "https://media.istockphoto.com/id/668001632/photo/bride-hands-with-ring-and-wedding-bouquet-of-flowers.jpg?s=1024x1024&w=is&k=20&c=QE9SouNmnNrzv6sM_FENNQtl0DK0LE1sr_3XFS_-hvs=",
//                      "https://media.istockphoto.com/id/1191384303/photo/kids-birthday-party-outdoors-in-garden-in-summer-celebration-concept.jpg?s=1024x1024&w=is&k=20&c=XC9KYXoOakanikSIeZrKfvv6OPAhYC8U848pqoVT6wY=",
//                      "https://media.istockphoto.com/id/1458481862/photo/asian-chinese-lesbian-couple-celebrating-birthday-outdoor-dining-with-friends.jpg?s=2048x2048&w=is&k=20&c=J99r0-JWty-ESlqyfGBh88G0BR6YoqdVeRO89jZms5k=",
//                      "https://media.istockphoto.com/id/1400225567/photo/floral-offerings-to-the-bride.jpg?s=2048x2048&w=is&k=20&c=Hoi-IJeYeDkTnGk3aPhRGbD834L4ShNb5EL1yfx2iXo=",
//                      "https://media.istockphoto.com/id/489247146/photo/happy-indian-couple-at-their-wedding.jpg?s=2048x2048&w=is&k=20&c=SR1jOlZnH7BTxtvXyLMGs22UmXQBdtauqu5xH9ph9dc="
//                 ));
//                 p4.setAbout("Specializing in all type of photography, my goal is to provide a seamless and enjoyable photography experience,resulting in stunning visuals that you'll cherish for a lifetime.");
//                 p4.setWorkingHours(Arrays.asList("09:00 AM","10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM", "05:00 PM","07:00 PM","08:00 PM","09:00 PM","10:00 PM"));
//                 p4.setLocation("Mumbai"); // Location add kar diya


//                 // Sabhi photographers ko ek list mein daalein
//                 List<Photographer> initialPhotographers = Arrays.asList(p1, p2, p3, p4);
                
//                 // List ko database mein save karein
//                 photographerRepository.saveAll(initialPhotographers);
//                 System.out.println("Initial photographer data populated.");
//             } else {
//                  System.out.println("Photographers table already populated.");
//             }
//         };
//     }
//     // --- YAHAN TAK NAYA RUNNER ---
// }



















