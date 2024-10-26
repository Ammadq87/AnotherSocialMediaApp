package com.ASMA.Controllers.Config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;

import java.util.Date;

public class JwtUtil {
    private static final String SECRET_KEY = "4475354fc6ad9678d38bd8eebc23be8a37ca38e36e34a6d242ce6379ba00a3c7";

    public static String generateToken(String username,
                                       String firstName,
                                       String lastName,
                                       String email,
                                       String userId) {
        return Jwts.builder()
                .setSubject(username)
                .claim("firstName", firstName)
                .claim("lastName", lastName)
                .claim("email", email)
                .claim("username", username)
                .claim("userID", userId)
                .setSubject(lastName).setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public static Claims parseToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    public static Boolean isTokenExpired(String token) {
        Claims claims = parseToken(token);

        if (claims == null)
            return false;

        Date expiration = claims.getExpiration();
        return expiration.before(new Date());
    }
}