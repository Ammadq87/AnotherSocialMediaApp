package com.ASMA.Services;

import com.ASMA.DAO.AuthDAO;
import com.ASMA.Models.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Component
@Slf4j
public class AuthService {
    private final AuthDAO authDAO;

    public AuthService(AuthDAO ar) {
        this.authDAO = ar;
    }

    public ResponseEntity<String> Register(User u) {
        Optional<User> numberOfUsers = authDAO.findUserByEmailOrUsername(u.getEmail(), u.getUsername());
        if (numberOfUsers.isPresent())
            return new ResponseEntity<>("Email or Username already exists", HttpStatus.CONFLICT);

        // ToDo - hash and encrypt passwords
        u.setUserID(UUID.randomUUID().toString());
        u.setTimestamp(LocalDate.now());
        u.setDob(u.getDob());
        log.debug(u.toString());
        authDAO.save(u);
        return new ResponseEntity<>("Successfully Registered", HttpStatus.OK);
    }

    public User Login(String email, String password) {
        Optional<User> found = authDAO.findUserByEmailAndPassword(email, password);
        return found.orElse(null);
    }
}
