package com.littlesunny.service;

import com.littlesunny.dto.request.UserCreationRequest;
import com.littlesunny.dto.request.UserUpdateRequest;
import com.littlesunny.dto.response.UserResponse;
import com.littlesunny.entity.User;
import com.littlesunny.exception.AppException;
import com.littlesunny.exception.ErrorCode;
import com.littlesunny.mapper.UserMapper;
import com.littlesunny.repository.UserRepository;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserServiceImpl implements UserService {
	UserRepository userRepository;
	UserMapper userMapper;
	PasswordEncoder passwordEncoder;
	
	@Override
	public UserResponse createUser(UserCreationRequest request) {
		User user = userMapper.toUser(request);
		
		if(userRepository.existsByUsername(request.getUsername()) || userRepository.existsByEmail(request.getEmail()))
			throw new AppException(ErrorCode.USER_EXISTED);
		
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		return userMapper.toUserResponse(user);
	}
	
	@Override
	public List<UserResponse> getUsers() {
		return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
	}
	
	@Override
	public UserResponse updateUser(String userId, UserUpdateRequest request) {
		return null;
	}
}
