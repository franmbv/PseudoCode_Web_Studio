package com.pseudocodewebstudio.backend.domain.dto.response;

public record OptionAdminResponseDto(
        int id,
        String text,
        boolean isCorrect
) { }
