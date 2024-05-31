package com.teacher.workbook.controller.user;

import com.teacher.workbook.domain.user.User;
import com.teacher.workbook.dto.user.LoginDto;
import com.teacher.workbook.dto.user.SignupRequestDto;
import com.teacher.workbook.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<User> signup(@RequestBody SignupRequestDto signupRequest) {
        User savedUser = userService.signup(signupRequest);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginDto loginDto) {
        boolean loginResult = userService.login(loginDto.getEmail(), loginDto.getPassword());

        if (loginResult) {
            return "로그인 성공";
        } else {
            return "로그인 실패: 이메일 또는 비밀번호가 잘못되었습니다.";
        }
    }
}
