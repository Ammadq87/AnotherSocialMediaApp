package com.asma.controllers;

import com.asma.exceptions.AccountException;
import com.asma.models.Following;
import com.asma.models.Post;
import com.asma.models.User;
import com.asma.services.AccountService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/account")
@Slf4j
public class AccountController {
    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) { this.accountService = accountService; }

    // GET
    @GetMapping(path = "/{id}")
    public ResponseEntity<User> getAccountById(@PathVariable String id) {
        try {
            var results = accountService.getAccountById(id);
            return new ResponseEntity<>(results, HttpStatus.OK);
        } catch (AccountException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search/{param}")
    public ResponseEntity<List<User>> getAccountsBySearchParam(@PathVariable String param) {
        try {
            var results = accountService.getAccountsBySearchParam(param);
            return new ResponseEntity<>(results, HttpStatus.OK);
        } catch (AccountException e) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/{userID}/posts")
    public ResponseEntity<List<Post>> getPostsByUserId(@NonNull @PathVariable String userID) {
        try {
            var posts = accountService.getPostsByUserId(userID);
            return new ResponseEntity<>(posts, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // PUT
    @PutMapping
    public ResponseEntity<Object> updateAccount(@RequestBody User user) {
        try {
            accountService.updateAccount(user);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (AccountException e) {
            log.info(e.getMessage());
          return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // POST
    @PostMapping(path = "/followUser")
    public ResponseEntity<String> followUser(@RequestBody Following following) {
        try {
            accountService.followUser(following);
            return new ResponseEntity<>("Following!", HttpStatus.OK);
        } catch (AccountException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
