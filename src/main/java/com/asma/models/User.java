package com.asma.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "User")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {
    @Id private String id;
    private String name;
    private String username;
    private String email;
    private String password;
    private Date dateOfBirth;
    private LocalDateTime lastUpdated;
    private LocalDateTime createdOn;
}
