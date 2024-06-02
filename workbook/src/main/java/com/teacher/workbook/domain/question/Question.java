package com.teacher.workbook.domain.question;

import com.teacher.workbook.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
public class Question {
    @Id
    @Column(name = "question_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String title; // 문제 게시글 제목
    private String questionTitle; // 문제 제목
    private String content; // 문제 내용
    private QuestionType questionType; // 4 또는 5
    private String image; // 이미지 경로 저장

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Option> options;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Answer> answers;

    private Integer totalPeopleNum; // 사용자들이 문제를 시도한 수
    private Integer totalCorrectPeopleNum ; // 사용자들이 문제를 맞춘 수

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
        totalPeopleNum = 0; // 문제를 시도한 사용자 수 초기화
        totalCorrectPeopleNum = 0; // 문제를 맞춘 사용자 수 초기화
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}



