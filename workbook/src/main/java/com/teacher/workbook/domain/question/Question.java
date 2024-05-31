package com.teacher.workbook.domain.question;

import com.teacher.workbook.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String title;
    private String content;
    @Enumerated(EnumType.STRING)
    private QuestionType questionType;
    private boolean isPastExam;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
