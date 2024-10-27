package com.ASMA.Controllers;

import com.ASMA.Exceptions.AccountException;
import com.ASMA.Models.Post;
import com.ASMA.Models.User;
import com.ASMA.Services.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/account")
@Slf4j
public class AccountController {
    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        log.debug("running controller");
        this.accountService = accountService;
    }

    @GetMapping(path = "/{userID}")
    public ResponseEntity<Object> getProfile(@PathVariable String userID) {
        User profile = null;
        try {
            profile = accountService.getProfile(userID);

            if (profile == null) {
                return new ResponseEntity<>("UserID not found", HttpStatus.NOT_FOUND);
            }

        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @PutMapping(path = "/{userID}")
    public ResponseEntity<Object> updateAccount(@PathVariable String userID, @RequestBody User user) {
        try {
            accountService.updateAccount(userID, user);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (AccountException e) {
            log.info(e.getMessage());
          return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/{userID}/posts")
    public ResponseEntity<List<Post>> getPostsByUserId(@PathVariable String userID) {
        List<Post> posts = null;
        try {
            posts = accountService.getPostsByUserId(userID);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

}
