package com.ASMA.Controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/feed")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class FeedController {
//    private final FeedService feedService;
//
//    @Autowired
//    public FeedController(FeedService fs) {
//          this.feedService = fs;
//    }

    @GetMapping(path = "/")
    /**
     * Retrieves a list of posts based on user id
     */
    public ResponseEntity<String> getFeed(HttpServletRequest req,
                                              HttpServletResponse res) {

       return new ResponseEntity<>("Hello", HttpStatus.OK);
    }

}
