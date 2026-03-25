package com.pseudocodewebstudio.backend.domain.repository;

import com.pseudocodewebstudio.backend.domain.dto.request.ExerciseSaveRequestDto;
import com.pseudocodewebstudio.backend.domain.dto.response.ExerciseAdminResponseDto;
import com.pseudocodewebstudio.backend.domain.dto.response.ExerciseStudentResponseDto;

import java.util.List;

public interface ExerciseRepository {
    //Create
    ExerciseAdminResponseDto saveExercise(ExerciseSaveRequestDto exerciseSaveRequestDto);

    //Read for Admin
    List<ExerciseAdminResponseDto> findAllExercisesForAdmin();
    ExerciseAdminResponseDto findExerciseByIdForAdmin(Long exerciseId);

    //Read for User
    List<ExerciseStudentResponseDto> findAllExercisesForStudent(Long studentId);
    ExerciseStudentResponseDto findExerciseByIdForStudent(Long exerciseId);

    //Update
    ExerciseAdminResponseDto updateExercise(Long exerciseId, ExerciseSaveRequestDto exerciseSaveRequestDto);

    //Delete
    void deleteExercise(Long exerciseId);


}
