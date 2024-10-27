package com.ASMA.DAO;

import com.ASMA.Models.Post;
import com.ASMA.Models.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountDAO extends JpaRepository<User, String> {

    @Query("SELECT U FROM User U WHERE U.userID = :userID")
    Optional<User> getProfileByID(@Param("userID") String userID);

    @Query("SELECT p FROM Post p WHERE p.postedBy = :userID")
    Optional<List<Post>> getPostsByUserId(@Param("userID") String userID);
}
