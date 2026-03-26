package com.pseudocodewebstudio.backend.domain.dto.request;

import com.pseudocodewebstudio.backend.persistence.entity.ExerciseType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ExerciseSaveRequestDto (
        @NotBlank(message = "Title cannot be blank")
        String title,

        @NotBlank(message = "Statement cannot be blank")
        String statement,

        @NotNull(message = "Exercise type cannot be null")
        ExerciseType type,

        @NotBlank(message = "Code snippet cannot be blank")
        String codeSnippet,

        @NotEmpty(message = "Options cannot be empty")
        @Size(min = 2, message = "There must be at least 2 options")
        @Valid
        List<OptionSaveRequestDto> options
){
}
