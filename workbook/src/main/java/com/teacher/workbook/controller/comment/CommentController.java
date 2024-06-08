package com.teacher.workbook.controller.comment;

import com.teacher.workbook.dto.comment.ModifyCommentDto;
import com.teacher.workbook.dto.comment.WriteCommentDto;
import com.teacher.workbook.service.comment.CommentService;
import com.teacher.workbook.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;

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

    @PutMapping("/{userId}/{commentId}")
    public ResponseEntity<String> updateComment(@PathVariable Long userId, @PathVariable Long commentId, @RequestBody ModifyCommentDto commentDto){
        boolean completed = commentService.updateComment(userId, commentId, commentDto);
        if (completed) {
            return ResponseEntity.status(201).body("댓글이 성공적으로 수정되었습니다.");
        }
        return ResponseEntity.status(401).body("댓글을 수정할 권한이 없습니다.");
    }

    @DeleteMapping("/{userId}/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable Long userId, @PathVariable Long commentId){
        boolean completed = commentService.deleteComment(userId, commentId);
        if (completed) {
            return ResponseEntity.status(201).body("댓글이 성공적으로 삭제되었습니다.");
        }
        return ResponseEntity.status(401).body("댓글을 수정할 권한이 없습니다.");
    }
}
