package com.teacher.workbook.service.user;

import com.teacher.workbook.domain.user.User;
import com.teacher.workbook.dto.user.SignupRequestDto;
import com.teacher.workbook.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    //private final PasswordEncoder passwordEncoder;

    // 회원가입
    public User signup(SignupRequestDto signupRequest) {
        // 중복 닉네임 및 이메일 체크
        if (userRepository.existsByNickname(signupRequest.getNickname())) {
            throw new IllegalArgumentException("Nickname already exists");
        }
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        // 비밀번호 암호화
        //String encodedPassword = passwordEncoder.encode(signupRequest.getPassword());

        // User 엔티티 생성 및 저장
        User user = User.builder()
                .nickname(signupRequest.getNickname())
                //.password(encodedPassword)
                .password(signupRequest.getPassword())
                .phoneNumber(signupRequest.getPhoneNumber())
                .email(signupRequest.getEmail())
                .name(signupRequest.getName())
                .build();
        return userRepository.save(user);
    }

    // 로그인
    public boolean login(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (user != null && user.getPassword().equals(password)) {
            return true; // 사용자가 존재하고 비밀번호가 일치하는 경우 로그인 성공
        } else {
            return false; // 사용자가 존재하지 않거나 비밀번호가 일치하지 않는 경우 로그인 실패
        }
    }
}
