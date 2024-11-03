package com.asma.services;

import com.asma.models.Post;
import com.asma.repositories.ContentDAO;
import com.asma.exceptions.ContentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;

@Component
public class ContentService {

    private final ContentDAO contentDAO;

    @Autowired
    public ContentService(ContentDAO contentDAO) {
        this.contentDAO = contentDAO;
    }

    public void createPost(Post post) throws ContentException {
        try {
            post.setCreatedOn(LocalDateTime.now());
            post.setId(UUID.randomUUID().toString());
            contentDAO.save(post);
        } catch (Exception e) {
            throw new ContentException(e.getMessage());
        }

    }

}
