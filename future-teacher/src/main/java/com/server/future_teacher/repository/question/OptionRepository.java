package com.server.future_teacher.repository.question;

import com.server.future_teacher.domain.question.Option;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptionRepository extends JpaRepository<Option, Long> {
}
