package com.asma.repositories;

import com.asma.models.Post;
import com.asma.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountDAO extends JpaRepository<User, String> {

    @Query("SELECT u FROM User u WHERE u.username LIKE %:param%")
    Optional<List<User>> getUsersBySearchParam(@Param("param") String param);

    @Query("SELECT U FROM User U WHERE U.id = :id")
    Optional<User> getAccountById(@Param("id") String id);

    @Query("SELECT p FROM Post p WHERE p.userId = :userID")
    Optional<List<Post>> getPostsByUserId(@Param("userID") String userID);

    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<List<User>> getUserByEmail(@Param("email") String email);

    @Query("SELECT u FROM User u WHERE u.username = :username")
    Optional<List<User>> getUserByUsername(@Param("username") String username);

    // Check if 'follower' follows 'user'
    @Query("select count(*) as count from Following f where f.userA = :userA and f.userB = :userB")
    int isAlreadyFollowing(@Param("userA") String userA, @Param("userB") String userB);
}
