package com.server.future_teacher.domain.user;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;
    private String nickname;
    private String password;
    private String email;
    private String name;
}
