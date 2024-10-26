package com.ASMA.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Post")
@Builder
@Data
@AllArgsConstructor
public class Post implements Serializable {

    @Id @NonNull private String postID;
    @NonNull private String postedBy;
    @NonNull private String caption;
    @NonNull private LocalDate createdOn;
    private String imageUrl;
    private long likeCount;
    private long commentCount;
    private long shareCount;

    public Post() {}

    @Override
    public String toString() {
        return "Post{" +
                "postID='" + postID + '\'' +
                ", postedBy='" + postedBy + '\'' +
                ", caption='" + caption + '\'' +
                ", uploadedDate=" + createdOn +
                ", imageUrl='" + imageUrl + '\'' +
                ", likeCount=" + likeCount +
                ", commentCount=" + commentCount +
                ", shareCount=" + shareCount +
                '}';
    }
}
