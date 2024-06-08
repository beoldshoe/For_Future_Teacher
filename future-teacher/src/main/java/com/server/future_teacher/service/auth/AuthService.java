package com.server.future_teacher.service.auth;

import com.server.future_teacher.dto.auth.UserLoginDto;

public interface AuthService {
    boolean login(UserLoginDto loginDTO);
}
