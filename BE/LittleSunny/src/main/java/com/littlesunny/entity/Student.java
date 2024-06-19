package com.littlesunny.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;
	String fullName;
	String address;
	LocalDate dob;
	String phoneNumber;
	String parentBankNumber;
	
	@OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
	Set<StudentClass> studentClasses = new HashSet<>();
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	Set<Course> courses;
}
