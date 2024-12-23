package com.asma.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
@Entity
@Table(name = "GoalStatus")
@AllArgsConstructor
public class GoalStatus implements Serializable {

    @Id private String id;
    @JoinColumn private String userId;
    private String title;

    public GoalStatus() {}
}
