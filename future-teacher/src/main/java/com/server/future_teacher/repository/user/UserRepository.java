package com.server.future_teacher.repository.user;

import com.server.future_teacher.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
