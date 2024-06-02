package com.teacher.workbook.service;

import com.teacher.workbook.domain.question.Question;
import com.teacher.workbook.dto.question.QuestionListDto;
import com.teacher.workbook.repository.question.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public List<QuestionListDto> getAllQuestionsList() {
        return questionRepository.findAllQuestionsWithStats();
    }

}
