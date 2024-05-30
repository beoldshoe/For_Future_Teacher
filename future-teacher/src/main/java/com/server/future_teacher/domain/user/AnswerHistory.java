package com.server.future_teacher.domain.user;

import com.server.future_teacher.domain.question.Question;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class AnswerHistory {
    @Id
    @Column(name="history_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
    private Long optionId; // 선택한 답의 ID
    private String answer; // 주관식 답변
    private boolean isCorrect;
    private LocalDateTime answeredAt;
}
