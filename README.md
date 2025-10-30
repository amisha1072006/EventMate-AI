# 🚀 EventMate-AI: Plan Smarter, Celebrate Better

Welcome to EventMate-AI! This is a full-stack web application designed to simplify event planning and scheduling, featuring an AI-powered assistant to help you find the best venues, planners, and more.

This project is built using:
* *Backend:* Spring Boot, Java, MySQL
* *Frontend:* React.js, JavaScript, CSS
* *AI:* OpenRouter API

---

## ✨ Features

* *User Authentication:* Secure login and registration for users.
* *Browse Services:* Users can browse different event services like Venues, Photographers, and Planners.
* *Bookings:* Easily book any available service for your event.
* *AI Chat Assistant:* An integrated chatbot (EventMate Bot) that answers questions about venues, food preferences (like veg/non-veg), and availability.
* *OTP Verification:* Secure email-based OTP verification for actions.

---

## 🔧 How to Run this Project

To run this project on your local machine, you need to follow these steps:

### Prerequisites

* Java (JDK)
* Node.js (npm)
* MySQL

### 1. Backend (Spring Boot)

1.  *Clone the repository:*
    bash
    git clone [https://github.com/amisha1072006/EventMate-AI.git](https://github.com/amisha1072006/EventMate-AI.git)
    cd EventMate-AI
    
2.  *Create application.properties:*
    Inside the backend/src/main/resources/ folder, create a new file named application.properties.
3.  *Add Configuration:*
    Copy and paste the following configuration into the file and *add your own keys/passwords*:
    properties
    # --- MySQL Database Configuration ---
    spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
    spring.datasource.username=your_mysql_username
    spring.datasource.password=your_mysql_password
    spring.jpa.hibernate.ddl-auto=update
    
    # --- Gmail SMTP Configuration (for OTP) ---
    spring.mail.host=smtp.gmail.com
    spring.mail.port=587
    spring.mail.username=your_gmail_email@gmail.com
    spring.mail.password=your_gmail_app_password
    spring.mail.properties.mail.smtp.auth=true
    spring.mail.properties.mail.smtp.starttls.enable=true
    
    # --- OpenRouter AI Configuration ---
    openrouter.api.key=sk-or-v1-your_new_openrouter_api_key
    
4.  *Run the Backend:*
    Open the BackendApplication.java file in your IDE (like VS Code or IntelliJ) and run it.

### 2. Frontend (React)

1.  *Install Dependencies:*
    Open a new terminal in the root project folder (EventMate-AI) and run:
    bash
    npm install
    
2.  *Start the App:*
    bash
    npm start
    
3.  Your app will automatically open at http://localhost:3000.