package com.teacher.workbook.dto.question;

import lombok.Getter;
import lombok.Setter;
import java.util.Set;

@Getter
@Setter
public class AnswerCreateDto {

    private String answers; // 정답. 복수 선택 가능하므로 "1,2"와 같은 형태로 저장
    private String subjectiveAnswer; // 주관식 정답
    private String image; // 해설 이미지
    private String commentary; // 해설

}
