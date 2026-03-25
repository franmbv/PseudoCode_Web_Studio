package com.pseudocodewebstudio.backend.domain.dto.request;

public record OptionSaveRequestDto (
        String text,
        boolean isCorrect
){}
