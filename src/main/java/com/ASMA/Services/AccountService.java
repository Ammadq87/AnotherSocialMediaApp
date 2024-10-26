package com.ASMA.Services;

import com.ASMA.DAO.AccountDAO;
import com.ASMA.Models.Post;
import com.ASMA.Models.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class AccountService {
    private static final Logger log = LoggerFactory.getLogger(AccountService.class);
    private final AccountDAO accountDAO;

    public AccountService(AccountDAO accountDAO) {
        this.accountDAO = accountDAO;
    }

    public User getProfile(String userID) {
        try {
            Optional<User> profile = accountDAO.getProfileByID(userID);
            if (profile.isPresent()) {
                return profile.get();
            }
        } catch (RuntimeException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }

        log.debug("Could not find profile with ID " + userID);
        return null;
    }

    public List<Post> getPostsByUserId(String userID) {
        List<Post> posts = new ArrayList<>();
        try {
            Optional<List<Post>> response = accountDAO.getPostsByUserId(userID);

            if (response.isPresent()) {
                posts = response.get();
            }
        } catch (RuntimeException e) {
            log.error(e.getMessage());
        }
        return posts;
    }
}
