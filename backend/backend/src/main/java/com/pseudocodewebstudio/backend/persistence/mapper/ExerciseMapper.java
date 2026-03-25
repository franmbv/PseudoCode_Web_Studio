package com.pseudocodewebstudio.backend.persistence.mapper;

import com.pseudocodewebstudio.backend.domain.dto.request.ExerciseSaveRequestDto;
import com.pseudocodewebstudio.backend.domain.dto.request.OptionSaveRequestDto;
import com.pseudocodewebstudio.backend.domain.dto.response.ExerciseAdminResponseDto;
import com.pseudocodewebstudio.backend.domain.dto.response.ExerciseStudentResponseDto;
import com.pseudocodewebstudio.backend.persistence.entity.Exercise;
import com.pseudocodewebstudio.backend.persistence.entity.Option;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;


import java.util.List;

@Mapper(componentModel = "spring", uses = {OptionMapper.class})
public interface ExerciseMapper {
    Exercise toEntity(ExerciseSaveRequestDto exerciseSaveRequestDto);

    ExerciseSaveRequestDto toDto(Exercise exercise);
    OptionSaveRequestDto toDto(Option option);
    void updateEntityFromDto(ExerciseSaveRequestDto exerciseSaveRequestDto,@MappingTarget Exercise exercise);


    List<ExerciseAdminResponseDto> toAdminResponseDto(List<Exercise> exercises);
    ExerciseAdminResponseDto toAdminResponseDto(Exercise exercise);
    List<ExerciseStudentResponseDto> toStudentResponseDto(List<Exercise> exercises);
    ExerciseStudentResponseDto toStudentResponseDto(Exercise exercise);


}
