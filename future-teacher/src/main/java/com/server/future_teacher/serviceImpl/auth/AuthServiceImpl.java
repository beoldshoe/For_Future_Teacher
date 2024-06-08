package com.server.future_teacher.serviceImpl.auth;

import com.server.future_teacher.domain.user.User;
import com.server.future_teacher.dto.auth.UserLoginDto;
import com.server.future_teacher.repository.user.UserRepository;
import com.server.future_teacher.service.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean login(UserLoginDto loginDto) {
        // 이메일로 사용자 정보 조회
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElse(null);

        if (user == null) {
            return false;
        }

        // 비밀번호 일치 확인
        // 주의: 실제 애플리케이션에서는 비밀번호를 암호화하여 검증해야 합니다.
        return user.getPassword().equals(loginDto.getPassword());
    }
}
