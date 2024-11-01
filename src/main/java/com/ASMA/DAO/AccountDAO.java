package com.ASMA.DAO;

import com.ASMA.Models.Post;
import com.ASMA.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountDAO extends JpaRepository<User, String> {

    @Query("SELECT U FROM User U WHERE U.userID LIKE :param OR U.username LIKE %:param%")
    Optional<List<User>> getProfileByIdOrUsername(@Param("param") String param);

    @Query("SELECT p FROM Post p WHERE p.postedBy = :userID")
    Optional<List<Post>> getPostsByUserId(@Param("userID") String userID);

    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<List<User>> getUserByEmail(@Param("email") String email);

    @Query("SELECT u FROM User u WHERE u.username = :username")
    Optional<List<User>> getUserByUsername(@Param("username") String username);

    @Query("SELECT u FROM User u WHERE u.email = :email or u.username = :username")
    Optional<List<User>> findUserByEmailOrUsername(String email, String username);

    // Check if 'follower' follows 'user'
    @Query("select count(*) as count from Following f where f.userA = :userA and f.userB = :userB")
    int isAlreadyFollowing(@Param("userA") String userA, @Param("userB") String userB);
}
