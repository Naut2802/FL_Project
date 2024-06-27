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
	@EmbeddedId
	StudentClassId id;
	
	@ManyToOne @MapsId("studentId")
	@JoinColumn(name = "student_id")
	Student student;
	@ManyToOne @MapsId("classId")
	@JoinColumn(name = "class_id")
	Class clazz;
	
	float score;
	LocalDate joinDate;
	double tuitionFee;
	LocalDate expirationDate;
	boolean paymentStatus;
	
	
	public StudentClass(Student student, Class clazz, float score,
	                    LocalDate joinDate, double tuitionFee,
	                    LocalDate expirationDate, boolean paymentStatus) {
		this.student = student;
		this.clazz = clazz;
		this.score = score;
		this.joinDate = joinDate;
		this.tuitionFee = tuitionFee;
		this.expirationDate = expirationDate;
		this.paymentStatus = paymentStatus;
	}
}
