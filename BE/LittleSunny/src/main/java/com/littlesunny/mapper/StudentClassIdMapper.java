package com.littlesunny.mapper;

import com.littlesunny.dto.request.RoleRequest;
import com.littlesunny.dto.request.StudentClassRequest;
import com.littlesunny.dto.response.ClassStudentResponse;
import com.littlesunny.dto.response.StudentClassResponse;
import com.littlesunny.entity.Role;
import com.littlesunny.entity.StudentClass;
import com.littlesunny.entity.StudentClassId;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface StudentClassIdMapper {
	StudentClassId toStudentClassId(StudentClassRequest request);
}
