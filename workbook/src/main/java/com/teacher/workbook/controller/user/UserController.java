package com.teacher.workbook.controller.user;

import com.teacher.workbook.domain.user.User;
import com.teacher.workbook.dto.user.UserUpdateDto;
import com.teacher.workbook.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    @Operation(summary = "개인정보 불러오기")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        User userInfo = userService.findUserById(id);
        if (userInfo != null) {
            // 사용자 정보를 성공적으로 찾았을 경우 HTTP 상태 코드 200(OK)와 함께 사용자 정보 반환
            return ResponseEntity.ok(userInfo);
        } else {
            // 사용자 정보를 찾지 못했을 경우 HTTP 상태 코드 404(NOT FOUND) 반환
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/{id}")
    @Operation(summary = "개인정보 수정")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserUpdateDto userUpdateDto) {
        User updatedUser = userService.updateUser(id, userUpdateDto);
        return ResponseEntity.ok(updatedUser);
    }
}
