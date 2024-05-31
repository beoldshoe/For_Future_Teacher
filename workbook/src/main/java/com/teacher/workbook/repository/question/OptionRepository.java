package com.teacher.workbook.repository.question;

import com.teacher.workbook.domain.question.Option;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptionRepository extends JpaRepository<Option, Long> {
}
