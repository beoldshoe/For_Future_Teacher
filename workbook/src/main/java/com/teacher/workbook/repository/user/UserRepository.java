package com.teacher.workbook.repository.user;

import com.teacher.workbook.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    boolean existsByNickname(String nickname);

    boolean existsByEmail(String email);
}