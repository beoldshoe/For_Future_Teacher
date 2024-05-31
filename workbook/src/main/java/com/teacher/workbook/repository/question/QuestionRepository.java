package com.teacher.workbook.repository.question;

import com.teacher.workbook.domain.question.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}