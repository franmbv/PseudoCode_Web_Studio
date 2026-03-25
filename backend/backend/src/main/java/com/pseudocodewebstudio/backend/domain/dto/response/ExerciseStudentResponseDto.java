package com.pseudocodewebstudio.backend.domain.dto.response;

import java.util.List;

public record ExerciseStudentResponseDto(
        int id,
        String title,
        String statement,
        String codeSnippet,
        List<OptionStudentResponseDto> options
) {}
