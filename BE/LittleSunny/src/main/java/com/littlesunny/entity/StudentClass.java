package com.littlesunny.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StudentClass {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;
	
	@ManyToOne @JoinColumn(name = "student_id")
	Student student;
	@ManyToOne @JoinColumn(name = "class_id")
	Class clazz;
	
	float score;
	LocalDate joinDate;
	double tuitionFee;
	LocalDate expirationDate;
	boolean isPaidFee;
	
	
	public StudentClass(Student student, Class clazz, float score,
	                    LocalDate joinDate, double tuitionFee,
	                    LocalDate expirationDate, boolean isPaidFee) {
		this.student = student;
		this.clazz = clazz;
		this.score = score;
		this.joinDate = joinDate;
		this.tuitionFee = tuitionFee;
		this.expirationDate = expirationDate;
		this.isPaidFee = isPaidFee;
	}
}
