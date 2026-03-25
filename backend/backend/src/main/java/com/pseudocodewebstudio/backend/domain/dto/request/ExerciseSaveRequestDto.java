package com.pseudocodewebstudio.backend.domain.dto.request;

import com.pseudocodewebstudio.backend.persistence.entity.ExerciseType;

import java.util.List;

public record ExerciseSaveRequestDto (
        String title,
        String statement,
        ExerciseType type,
        String codeSnippet,
        List<OptionSaveRequestDto> options
){
}
