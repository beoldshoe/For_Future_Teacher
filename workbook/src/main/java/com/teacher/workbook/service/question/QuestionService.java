package com.teacher.workbook.service.question;

import com.teacher.workbook.domain.question.Answer;
import com.teacher.workbook.domain.question.Choice;
import com.teacher.workbook.domain.question.Question;
import com.teacher.workbook.domain.user.User;
import com.teacher.workbook.dto.question.OptionCreateDto;
import com.teacher.workbook.dto.question.QuestionCreateDto;
import com.teacher.workbook.dto.question.AnswerCreateDto;
import com.teacher.workbook.dto.question.QuestionListDto;
import com.teacher.workbook.repository.question.AnswerRepository;
import com.teacher.workbook.repository.question.OptionRepository;
import com.teacher.workbook.repository.question.QuestionRepository;
import com.teacher.workbook.repository.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private OptionRepository optionRepository;
    @Autowired
    private AnswerRepository answerRepository;
    @Autowired
    private UserRepository userRepository; // 사용자 정보를 조회하기 위해
    

    public List<QuestionListDto> getAllQuestionsList() {
        return questionRepository.findAllQuestionsWithStats();
    }

    @Transactional
    public Question createQuestion(Long userId, QuestionCreateDto questionDto, List<OptionCreateDto> optionDtos, AnswerCreateDto answerDto) {
        // 사용자 정보 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + userId));

        // Question 엔티티 생성 및 저장
        Question question = new Question();
        question.setUser(user);
        question.setTitle(questionDto.getTitle());
        question.setContent(questionDto.getContent());
        question.setQuestionType(questionDto.getQuestionType());
        question.setImage(questionDto.getImage());
        question.setIsPastExam(questionDto.isPastExam());
        questionRepository.save(question);

        List<Choice> choices = new ArrayList<>();
        // Option 엔티티 생성 및 저장
        for (OptionCreateDto optionDto : optionDtos) {
            Choice choice = new Choice();
            choice.setQuestion(question);
            choice.setNumber(optionDto.getNumber());
            choice.setContent(optionDto.getContent());
            choices.add(choice);
            optionRepository.save(choice);
        }

        // Answer 엔티티 생성 및 저장
        Answer answer = new Answer();
        answer.setQuestion(question);
        answer.setAnswers(answerDto.getAnswers());
        answer.setSubjectiveAnswer(answerDto.getSubjectiveAnswer());
        answer.setImage(answerDto.getImage());
        answer.setCommentary(answerDto.getCommentary());
        answerRepository.save(answer);

        return question;
    }
}
