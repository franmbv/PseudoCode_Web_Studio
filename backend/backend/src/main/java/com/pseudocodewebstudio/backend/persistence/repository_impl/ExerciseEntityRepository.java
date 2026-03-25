package com.pseudocodewebstudio.backend.persistence.repository_impl;

import com.pseudocodewebstudio.backend.domain.dto.request.ExerciseSaveRequestDto;
import com.pseudocodewebstudio.backend.domain.dto.response.ExerciseAdminResponseDto;
import com.pseudocodewebstudio.backend.domain.dto.response.ExerciseStudentResponseDto;
import com.pseudocodewebstudio.backend.domain.repository.ExerciseRepository;
import com.pseudocodewebstudio.backend.persistence.crud.CrudExerciseEntity;
import com.pseudocodewebstudio.backend.persistence.entity.Exercise;
import com.pseudocodewebstudio.backend.persistence.mapper.ExerciseMapper;
import com.pseudocodewebstudio.backend.persistence.mapper.OptionMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ExerciseEntityRepository implements ExerciseRepository {
    private final CrudExerciseEntity crudExerciseEntity;
    private final ExerciseMapper exerciseMapper;

    public ExerciseEntityRepository(CrudExerciseEntity crudExerciseEntity, ExerciseMapper exerciseMapper) {
        this.crudExerciseEntity = crudExerciseEntity;
        this.exerciseMapper = exerciseMapper;
    }

    @Override
    public ExerciseAdminResponseDto saveExercise(ExerciseSaveRequestDto exerciseSaveRequestDto) {

        Exercise exerciseEntity = this.exerciseMapper.toEntity(exerciseSaveRequestDto);
        return this.exerciseMapper.toAdminResponseDto(this.crudExerciseEntity.save(exerciseEntity));
    }

    @Override
    public List<ExerciseAdminResponseDto> findAllExercisesForAdmin() {
        return this.exerciseMapper.toAdminResponseDto(this.crudExerciseEntity.findAll());
    }

    @Override
    public ExerciseAdminResponseDto findExerciseByIdForAdmin(Long exerciseId) {
        Exercise exerciseEntity = this.crudExerciseEntity.findById(exerciseId).orElse(null);
        return this.exerciseMapper.toAdminResponseDto(exerciseEntity);
    }

    @Override
    public List<ExerciseStudentResponseDto> findAllExercisesForStudent(Long studentId) {
        return this.exerciseMapper.toStudentResponseDto(this.crudExerciseEntity.findAll());
    }

    @Override
    public ExerciseStudentResponseDto findExerciseByIdForStudent(Long exerciseId) {
        Exercise exerciseEntity = this.crudExerciseEntity.findById(exerciseId).orElse(null);
        return this.exerciseMapper.toStudentResponseDto(exerciseEntity);
    }

    @Override
    public ExerciseAdminResponseDto updateExercise(Long exerciseId, ExerciseSaveRequestDto exerciseSaveRequestDto) {
       Exercise exerciseEntity = this.crudExerciseEntity.findById(exerciseId).orElse(null);
       if(exerciseEntity == null) return null;

       this.exerciseMapper.updateEntityFromDto(exerciseSaveRequestDto,exerciseEntity);

       return this.exerciseMapper.toAdminResponseDto(this.crudExerciseEntity.save(exerciseEntity));
    }

    @Override
    public void deleteExercise(Long exerciseId) {
        if(!this.crudExerciseEntity.existsById(exerciseId)) {
            throw new RuntimeException("Exercise with id " + exerciseId + " does not exist.");
        }

        this.crudExerciseEntity.deleteById(exerciseId);
    }
}