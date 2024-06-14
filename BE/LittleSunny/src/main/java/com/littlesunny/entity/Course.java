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
public class Course {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	String courseName;
	double coursePrice;
	
	@OneToMany(mappedBy = "course", fetch = FetchType.EAGER)
	Set<Class> classes;
}
