package com.littlesunny.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;
	String fullName;
	String address;
	String dob;
	String phoneNumber;
	String parentBankNumber;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	Set<StudentClass> classes = new HashSet<>();
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	Set<Course> courses;
}
