package com.littlesunny.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Entity
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	String id;
	@Column(name = "username", unique = true)
	String username;
	String password;
	@Column(name = "email", unique = true)
	String email;
	String firstName;
	String lastName;
	
	@ManyToMany
	Set<Role> roles;
}
