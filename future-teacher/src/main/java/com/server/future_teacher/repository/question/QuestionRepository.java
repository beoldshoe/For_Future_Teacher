package com.server.future_teacher.repository.question;

import com.server.future_teacher.domain.question.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
