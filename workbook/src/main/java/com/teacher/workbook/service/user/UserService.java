package com.teacher.workbook.service.user;

import com.teacher.workbook.domain.user.User;
import com.teacher.workbook.dto.user.UserUpdateDto;
import com.teacher.workbook.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User updateUser(Long id, UserUpdateDto userUpdateDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        user.setNickname(userUpdateDto.getNickname());
        user.setEmail(userUpdateDto.getEmail());
        user.setPassword(userUpdateDto.getPassword());
        user.setName(userUpdateDto.getName());
        user.setPhoneNumber(userUpdateDto.getPhoneNumber());

        return userRepository.save(user);
    }

    public User findUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        return user;
    }

    public boolean deleteUserById(Long id) {
        // 먼저, 해당 ID의 사용자가 존재하는지 확인
        if (!userRepository.existsById(id)) {
            // 해당 ID의 사용자가 존재하지 않는 경우, false 반환
            return false;
        }
        // 사용자가 존재하는 경우, 삭제 수행
        userRepository.deleteById(id);
        // 삭제 후, 해당 ID의 사용자가 정말로 삭제되었는지 다시 확인하여 결과 반환
        return !userRepository.existsById(id);
    }

}

