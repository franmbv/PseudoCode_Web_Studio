package com.pseudocodewebstudio.backend.domain.dto.response;

import java.util.List;

public record ExerciseAdminResponseDto(
        int id,
        String title,
        List<OptionAdminResponseDto> options
) {
}
