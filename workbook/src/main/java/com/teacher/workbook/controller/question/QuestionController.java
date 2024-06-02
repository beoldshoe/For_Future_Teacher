package com.teacher.workbook.controller.question;

import com.teacher.workbook.domain.question.Question;
import com.teacher.workbook.dto.question.QuestionCreateRequest;
import com.teacher.workbook.dto.question.QuestionListDto;
import com.teacher.workbook.service.question.QuestionService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    @Operation(summary = "문제 게시글 다 가져오기")
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

    @PostMapping("/{userId}")
    @Operation(summary = "문제 게시글 작성")
    public ResponseEntity<Question> createQuestion(@PathVariable Long userId,
                                                   @RequestBody QuestionCreateRequest request) {
        try {
            Question question = questionService.createQuestion(userId,
                    request.getQuestionDto(),
                    request.getOptionDtos(),
                    request.getAnswerDto());
            return new ResponseEntity<>(question, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
