package com.asma.controllers;

import com.asma.exceptions.AuthException;
import com.asma.models.User;
import com.asma.services.AuthService;
import com.asma.controllers.formClasses.Login;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.asma.controllers.config.JwtUtil.addJwtCookie;
import static com.asma.controllers.config.JwtUtil.clearCookies;

@RestController
@RequestMapping(path = "api/v1/auth")
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService as) {
        this.authService = as;
    }

    @PostMapping(path = "/register")
    public ResponseEntity<String> register(@RequestBody User user, HttpServletRequest req, HttpServletResponse res) {
        try {
            authService.register(user);
            HttpSession session = req.getSession(true);
            addJwtCookie(session, user, res);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (AuthException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/login")
    public ResponseEntity<String> login(@RequestBody Login loginBody, HttpServletRequest req, HttpServletResponse res) {
        try {
            // Create session if DNE
            HttpSession session = req.getSession(true);
            User user = authService.login(loginBody.getEmail(), loginBody.getPassword());
            addJwtCookie(session, user, res);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (AuthException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/logout")
    public ResponseEntity<String> logout(HttpServletRequest req, HttpServletResponse res) {
        HttpSession session = req.getSession();
        clearCookies(req, res);
        session.invalidate();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}