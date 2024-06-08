package com.teacher.workbook.dto.comment;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class WriteCommentDto {

    private Long userId;

    private Long postId;

    private String comment;

    private LocalDateTime createdAt;
}
