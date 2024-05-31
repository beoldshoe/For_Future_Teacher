package com.teacher.workbook.domain.question;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Answer {
    @Id
    @Column(name = "answer_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
    private String options; // JSON 형태의 문자열로 선택지 저장
    @Lob
    private String subjectiveAnswer; // 주관식 답변 저장

}

