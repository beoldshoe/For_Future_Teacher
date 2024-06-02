package com.teacher.workbook.dto.question;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class QuestionCreateRequest {

    private QuestionCreateDto questionDto;
    private List<OptionCreateDto> optionDtos;
    private AnswerCreateDto answerDto;

}
