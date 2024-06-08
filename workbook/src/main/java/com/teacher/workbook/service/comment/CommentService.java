package com.teacher.workbook.service.comment;

import com.teacher.workbook.domain.comment.Comment;
import com.teacher.workbook.dto.comment.WriteCommentDto;
import com.teacher.workbook.repository.comment.CommentRepository;
import com.teacher.workbook.repository.post.PostRepository;
import com.teacher.workbook.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;

    // 댓글 불러오기

    // 댓글 작성
    public void createComment(Long userId, Long postId, WriteCommentDto commentDto) {
        Comment comment = new Comment();

        comment.setUser(userRepository.getReferenceById(userId));
        comment.setPost(postRepository.getReferenceById(postId));
        comment.setComment(commentDto.getComment());
        commentRepository.save(comment);
    }

    // 댓글 수정







    // 댓글 삭제

}
