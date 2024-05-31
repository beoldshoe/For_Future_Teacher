package com.teacher.workbook.domain.question;

import jakarta.persistence.*;

@Entity
public class Option {
    @Id
    @Column(name = "option_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
    private int number;
    private String content;
}
