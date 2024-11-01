package com.ASMA.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "Following")
@Builder
@Data
@AllArgsConstructor
public class Following implements Serializable {

    @Id private String id;
    @JoinColumn private String userA;
    @JoinColumn private String userB;
    private LocalDate timestamp;

    public Following() {}

}
