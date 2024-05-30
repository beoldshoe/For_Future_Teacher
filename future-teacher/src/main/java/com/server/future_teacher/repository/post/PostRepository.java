package com.server.future_teacher.repository.post;

import com.server.future_teacher.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
