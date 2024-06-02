package com.teacher.workbook.domain.post;

import com.teacher.workbook.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

// 질의 응답 게시판을 위한 entity
@Setter
@Getter
@Entity
public class Post {
    @Id
    @Column(name="post_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String title;
    private String content;
    //private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}