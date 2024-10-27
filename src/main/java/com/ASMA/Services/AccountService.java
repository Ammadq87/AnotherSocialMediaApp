package com.ASMA.Services;

import com.ASMA.DAO.AccountDAO;
import com.ASMA.Exceptions.AccountException;
import com.ASMA.Models.Post;
import com.ASMA.Models.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.*;

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

    public void updateAccount(String userID, User user) throws AccountException {
        String validAccount = isAccountValid(user);

        if (validAccount != null) {
            throw new AccountException(validAccount);
        }

        accountDAO.save(user);
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
