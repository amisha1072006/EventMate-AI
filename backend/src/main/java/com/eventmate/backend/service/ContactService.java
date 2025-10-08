package com.eventmate.backend.service;

import com.eventmate.backend.models.ContactMessage;
import com.eventmate.backend.repositories.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @Autowired
    private JavaMailSender mailSender;

    // Destination email (your inbox)
    private final String DESTINATION_EMAIL = "eventmate.planner.ai@gmail.com";

    public ContactMessage saveMessage(ContactMessage message) {
        // 1. Save in database
        ContactMessage savedMessage = contactMessageRepository.save(message);

        // 2. Send email
        try {
            sendEmailNotification(savedMessage);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }

        return savedMessage;
    }

    private void sendEmailNotification(ContactMessage message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(DESTINATION_EMAIL);
        mailMessage.setSubject("New Contact Message from " + message.getName());
        mailMessage.setText(
                "You have received a new message:\n\n" +
                        "Name: " + message.getName() + "\n" +
                        "Email: " + message.getEmail() + "\n" +
                        "Message:\n" + message.getMessage()
        );

        mailSender.send(mailMessage);
    }
}
