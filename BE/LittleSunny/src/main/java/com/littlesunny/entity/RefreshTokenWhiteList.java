package com.littlesunny.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RefreshTokenWhiteList {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;
	@Column(name = "token", nullable = false, columnDefinition = "TEXT")
	String token;
	Date expiryTime;
	
	@ManyToOne @JoinColumn(name = "user_id")
	User user;
}
