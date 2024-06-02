package com.teacher.workbook.controller.question;

import com.teacher.workbook.dto.question.QuestionListDto;
import com.teacher.workbook.service.QuestionService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }
    @Operation(summary = "문제 게시글 다 가져오기")
    @GetMapping
    public ResponseEntity<?> getAllQuestions() {
        List<QuestionListDto> questions = questionService.getAllQuestionsList();

        // 게시글 리스트가 비어있는지 확인
        if (questions.isEmpty()) {
            // 비어있다면 적절한 메시지와 함께 NOT_FOUND 상태 코드를 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글이 없습니다.");
        }

        // 게시글이 있다면 리스트를 반환
        return ResponseEntity.ok(questions);
    }




}
