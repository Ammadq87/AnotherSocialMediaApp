package com.ASMA.Services;

import com.ASMA.DAO.AccountDAO;
import com.ASMA.DAO.FollowingDAO;
import com.ASMA.Exceptions.AccountException;
import com.ASMA.Models.Following;
import com.ASMA.Models.Post;
import com.ASMA.Models.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.*;

@Component
public class AccountService {
    private static final Logger log = LoggerFactory.getLogger(AccountService.class);
    private final AccountDAO accountDAO;
    private final FollowingDAO followingDAO;

    public AccountService(AccountDAO accountDAO, FollowingDAO followingDAO) {
        this.accountDAO = accountDAO;
        this.followingDAO = followingDAO;
    }

    public List<User> getProfileByIdOrUsername(String param) {
        try {
            Optional<List<User>> profile = accountDAO.getProfileByIdOrUsername(param);
            if (profile.isPresent()) {
                return profile.get();
            }
        } catch (RuntimeException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }

        log.debug("Could not find profile with ID " + param);
        return null;
    }

    public void updateAccount(String userID, User updatedUser) throws AccountException {
        Optional<List<User>> currentProfile = accountDAO.getProfileByIdOrUsername(userID);
        User currentUser = null;

        if (currentProfile.isPresent()) {
            currentUser = currentProfile.get().getFirst();
        } else {
            throw new AccountException("User not found");
        }

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

        String validAccount = isAccountValid(updatedUser);

        if (validAccount != null) {
            throw new AccountException(validAccount);
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
                following.setTimestamp(LocalDate.now());
                followingDAO.save(following);
            }
        } catch (RuntimeException e) {
            log.error(e.getMessage());
            throw new AccountException("Couldn't follow user");
        }
    }

    private String isAccountValid(User user) {
        if (user.getDob() == null) {
            return "DOB not provided";
        } else {
            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.DATE, -18);
            Date validAge = cal.getTime();

            if (user.getDob().after(validAge)) {
                return "User is underage";
            }
        }

        boolean validPassword = isPasswordValid(user.getPassword());
        if (!validPassword) {
            return "Password not valid";
        }

        return null;
    }

    private boolean isPasswordValid(String password) {
        return password.length() >= 8;
    }
}
