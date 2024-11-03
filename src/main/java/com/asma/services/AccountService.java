package com.asma.services;

import com.asma.controllers.config.HashingUtil;
import com.asma.exceptions.HashException;
import com.asma.models.Following;
import com.asma.models.Post;
import com.asma.models.User;
import com.asma.repositories.AccountDAO;
import com.asma.repositories.FollowingDAO;
import com.asma.exceptions.AccountException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class AccountService {
    private static final Logger log = LoggerFactory.getLogger(AccountService.class);
    private final AccountDAO accountDAO;
    private final FollowingDAO followingDAO;

    public AccountService(AccountDAO accountDAO, FollowingDAO followingDAO) {
        this.accountDAO = accountDAO;
        this.followingDAO = followingDAO;
    }

    public User getAccountById(String id) throws AccountException {
        try {
            Optional<User> profile = accountDAO.getAccountById(id);

            if (profile.isPresent()) {
                return profile.get();
            }

        } catch (RuntimeException e) {
            throw new AccountException(e.getMessage());
        }

        log.debug("Could not find profile with ID {} ", id);
        return null;
    }

    public List<User> getAccountsBySearchParam(String param) throws AccountException {
        try {
            Optional<List<User>> results = accountDAO.getUsersBySearchParam(param);
            return results.orElseGet(ArrayList::new);
        } catch (RuntimeException e) {
            throw new AccountException(e.getMessage());
        }
    }

    public void updateAccount(User updatedUser) throws AccountException {
        Optional<User> result = accountDAO.getAccountById(updatedUser.getId());
        User currentUser;

        if (result.isEmpty()) {
            throw new AccountException("User not found");
        }

        currentUser = result.get();

        if (!currentUser.getUsername().equals(updatedUser.getUsername())) {
            Optional<List<User>> usernames = accountDAO.getUserByUsername(updatedUser.getUsername());
            if (usernames.isPresent() && !usernames.get().isEmpty()) {
                throw new AccountException("Username already in use");
            }
        }

        if (!currentUser.getEmail().equals(updatedUser.getEmail())) {
            Optional<List<User>> emails = accountDAO.getUserByEmail(updatedUser.getEmail());
            if (emails.isPresent() && !emails.get().isEmpty()) {
                throw new AccountException("Email already in use");
            }
        }

        validateAccount(updatedUser, currentUser);

        try {
            updatedUser.setPassword(HashingUtil.getHash(updatedUser.getPassword()));
        } catch (HashException e) {
            throw new AccountException(e.getMessage());
        }

        accountDAO.save(updatedUser);
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

    public void followUser(Following following) throws AccountException {
        try {
            boolean isAlreadyFollowed = accountDAO.isAlreadyFollowing(following.getUserA(), following.getUserB()) == 1;

            if (!isAlreadyFollowed) {
                following.setId(UUID.randomUUID().toString());
                following.setFollowedOn(LocalDateTime.now());
                followingDAO.save(following);
            }
        } catch (RuntimeException e) {
            log.error(e.getMessage());
            throw new AccountException("Couldn't follow user");
        }
    }

    private void validateAccount(User newUser, User oldUser) throws AccountException {
        if (newUser.getDateOfBirth() == null) {
            throw new AccountException("Date of Birth not provided");
        } else {
            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.DATE, -16);
            Date validAge = cal.getTime();

            if (newUser.getDateOfBirth().after(validAge)) {
                throw new AccountException("User is underage");
            }
        }

        if (!oldUser.getPassword().equals(newUser.getPassword()) && !isPasswordValid(newUser.getPassword())) {
            throw new AccountException("Invalid password: (8+ characters, 1+ number, 1+ symbol (@$!%*#?&))");
        }
    }

    private boolean isPasswordValid(String password) {
        String regex = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(password);
        return matcher.find();
    }
}
