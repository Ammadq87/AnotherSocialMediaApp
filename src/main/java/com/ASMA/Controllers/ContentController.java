package com.ASMA.Controllers;

import com.ASMA.Exceptions.ContentException;
import com.ASMA.Models.Post;
import com.ASMA.Services.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/content")
public class ContentController {

    private final ContentService contentService;

    @Autowired
    public ContentController(ContentService contentService) {this.contentService = contentService;}

    @PostMapping("")
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        try {
            contentService.createPost(post);
        } catch (ContentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
