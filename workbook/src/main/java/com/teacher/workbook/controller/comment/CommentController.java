package com.teacher.workbook.controller.comment;

import com.teacher.workbook.dto.comment.WriteCommentDto;
import com.teacher.workbook.service.comment.CommentService;
import com.teacher.workbook.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    private final UserService userService;

    @PostMapping("/{userId}/{postId}")
    public ResponseEntity<String> createComment(@PathVariable Long userId , @PathVariable Long postId, @RequestBody WriteCommentDto comment) {
        boolean isLoggedIn = userService.isLogin(userId);

        if (!isLoggedIn) {
            return ResponseEntity.status(401).body("로그인을 하고 댓글을 작성해주세요");
        }

        commentService.createComment(userId, postId, comment);
        return ResponseEntity.status(201).body("댓글이 성공적으로 작성되었습니다");
    }
}
