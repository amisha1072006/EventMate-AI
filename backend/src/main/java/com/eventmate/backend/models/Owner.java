package com.eventmate.backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "owners")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    // optional fields
    private String name;
    private String phone;
    private String otp;
    private LocalDateTime now;

    public void setEmail(String email) {this.email=email;
    }

    public void setPassword(String password) {this.password=password;
    }

    public void setName(String name) {this.name=name;
    }

    public void setPhone(String phone) {this.phone=phone;
    }

    public String getPassword() {return this.password;
    }

    public void setOtp(String otp) {this.otp=otp;
    }

    public void setOtpGeneratedTime(LocalDateTime now) {this.now=now;
    }

    public String getEmail() {return this.email;
    }

    public String getOtp() {return otp;
    }

    public LocalDateTime getOtpGeneratedTime() {return this.now;
    }
}
