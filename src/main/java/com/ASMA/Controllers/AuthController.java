package com.ASMA.Controllers;

import com.ASMA.Controllers.Config.JwtUtil;
import com.ASMA.Models.User;
import com.ASMA.Services.AuthService;
import com.ASMA.Controllers.FormClasses.Login;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        ResponseEntity<String> response = authService.Register(user);

        if (response.getStatusCode().equals(HttpStatus.OK)) {
            HttpSession session = req.getSession(true);
            setUserDetails(session, user, res);
            System.out.println("[log] > Registered as " + user.getUsername());
        } else {
            System.out.println("[log] > Registered filed " + user.toString());
        }

        return response;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<String> login(@RequestBody Login loginBody, HttpServletRequest req, HttpServletResponse res) {
        HttpSession session = req.getSession(true); // create session if DNE
        User user = authService.Login(loginBody.getEmail(), loginBody.getPassword());

        if (user != null) {
            setUserDetails(session, user, res);
            System.out.println("[log] > Logged in as " + user.getUsername());
            return new ResponseEntity<>(HttpStatus.OK);
        }

        System.out.println("[log] > Invalid login attempt");
        return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping(path = "/logout")
    public ResponseEntity<String> logout(HttpServletRequest req, HttpServletResponse res) {
        HttpSession session = req.getSession();

        // Clearing cookies
        clearCookies(req, res);

        session.invalidate();

        System.out.println("[log] > User Logged Out");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Private Methods
    private void clearCookies(HttpServletRequest req, HttpServletResponse res) {
        for (Cookie c : req.getCookies()) {
            c.setValue(null);
            c.setMaxAge(0);
            c.setSecure(true);
            c.setHttpOnly(true);
            c.setPath("/");
            res.addCookie(c);
        }
    }

    private void setUserDetails(HttpSession session, User user, HttpServletResponse res) {
        String jwtToken = JwtUtil.generateToken(user.getUsername(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getUserID());

        session.setAttribute("user", user);

        Cookie cookie = new Cookie("token", jwtToken);
        cookie.setPath("/"); // cookie is available to all routes of the application
        cookie.setHttpOnly(false); // cookie if sent ONLY over HTTP, JS cannot access if true for security reasons
        cookie.setSecure(false); // inaccessible to JavaScript, only true when using HTTPS
        cookie.setMaxAge(60 * 60); // 1 minute
        res.addCookie(cookie);
    }
}