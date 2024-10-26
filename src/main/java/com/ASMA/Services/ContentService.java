package com.ASMA.Services;

import com.ASMA.DAO.ContentDAO;
import com.ASMA.Exceptions.ContentException;
import com.ASMA.Models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
            UUID postID = UUID.randomUUID();
            post.setPostID(String.valueOf(postID));
            contentDAO.save(post);
        } catch (Exception e) {
            throw new ContentException(e.getMessage());
        }

    }

}
