package com.littlesunny.service;

import com.littlesunny.dto.request.AuthorizeUserRequest;
import com.littlesunny.dto.request.RoleRequest;
import com.littlesunny.dto.request.UserCreationRequest;
import com.littlesunny.dto.request.UserUpdateRequest;
import com.littlesunny.dto.response.UserResponse;
import com.littlesunny.entity.Role;
import com.littlesunny.entity.User;
import com.littlesunny.exception.AppException;
import com.littlesunny.exception.ErrorCode;
import com.littlesunny.mapper.UserMapper;
import com.littlesunny.repository.RoleRepository;
import com.littlesunny.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserService {
	private final RoleRepository roleRepository;
	UserRepository userRepository;
	UserMapper userMapper;
	PasswordEncoder passwordEncoder;
	
	public UserResponse createUser(UserCreationRequest request) {
		if(userRepository.existsByUsername(request.getUsername()))
			throw new AppException(ErrorCode.USER_EXISTED);
		
		var user = userMapper.toUser(request);
		
		user.setPassword(encodePassword(user.getUsername(), user.getPassword()));
		
		Set<Role> roles = new HashSet<>();
		var role = new Role();
		role.setName("USER");
		roles.add(role);
		
		user.setRoles(roles);
		
		userRepository.save(user);
		return userMapper.toUserResponse(user);
	}
	
	@PostAuthorize("returnObject.username == authentication.name")
	public UserResponse getMyInfo() {
		var context = SecurityContextHolder.getContext();
		String name = context.getAuthentication().getName();
		
		User user = userRepository.findByUsername(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
		
		return userMapper.toUserResponse(user);
	}
	
	@PostAuthorize("returnObject.username == authentication.name")
	public UserResponse updateUser(String userId, UserUpdateRequest request) {
		var user = userRepository.findById(userId).orElseThrow(()
				-> new AppException(ErrorCode.USER_NOT_EXISTED));
		
		userMapper.updateUser(user, request);
		user.setPassword(encodePassword(user.getUsername(), user.getPassword()));
		return userMapper.toUserResponse(userRepository.save(user));
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	public UserResponse authorizeUser(String userId, AuthorizeUserRequest request) {
		var user = userRepository.findById(userId).orElseThrow(()
				-> new AppException(ErrorCode.USER_NOT_EXISTED));
		
		List<Role> roles = roleRepository.findAllByName(request.getRoles());
		
		user.setRoles(new HashSet<>(roles));
		return userMapper.toUserResponse(userRepository.save(user));
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	public UserResponse getUser(String userId) {
		return userMapper.toUserResponse(userRepository.findById(userId).orElseThrow(()
				-> new AppException(ErrorCode.USER_NOT_EXISTED)));
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	public List<UserResponse> getUsers() {
		return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	public void deleteUser(String userId) {
		if(!userRepository.existsById(userId))
			throw new AppException(ErrorCode.USER_NOT_EXISTED);
		
		userRepository.deleteById(userId);
	}
	
	private String encodePassword(String username, String password) {
		return passwordEncoder.encode(username + password);
	}
}
