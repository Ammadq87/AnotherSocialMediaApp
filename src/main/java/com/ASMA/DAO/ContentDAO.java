package com.ASMA.DAO;

import com.ASMA.Models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentDAO extends JpaRepository<Post, String> {

}
