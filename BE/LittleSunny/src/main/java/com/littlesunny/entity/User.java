package com.littlesunny.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

import static jakarta.persistence.CascadeType.REMOVE;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
