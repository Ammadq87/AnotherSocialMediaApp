package com.asma.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@Entity
@Table(name = "Following")
@AllArgsConstructor
public class Following implements Serializable {
    @Id private String id;
    @JoinColumn private String userA;
    @JoinColumn private String userB;
    private LocalDateTime followedOn;

    public Following() {}
}
