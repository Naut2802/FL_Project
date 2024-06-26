package com.littlesunny.security.user;

import com.littlesunny.entity.Role;
import com.littlesunny.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Data
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomUserDetails implements UserDetails {
	User user;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<String> roles = this.user.getRoles().stream().map(Role::getRoleName).toList();
		return roles.stream().map(SimpleGrantedAuthority::new).toList();
	}
	
	@Override
	public String getPassword() {
		return user.getPassword();
	}
	
	@Override
	public String getUsername() {
		return user.getUsername();
	}
}
