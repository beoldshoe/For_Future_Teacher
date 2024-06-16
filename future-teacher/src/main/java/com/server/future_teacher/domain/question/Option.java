package com.server.future_teacher.domain.question;

import jakarta.persistence.*;

@Entity
@Table(name = "`option`")
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