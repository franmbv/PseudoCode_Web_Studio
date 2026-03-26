package com.pseudocodewebstudio.backend.domain.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record OptionSaveRequestDto (
        @NotBlank(message = "Text cannot be blank")
        @Size(min = 1, max = 1000, message = "Text must be between 1 and 1000 characters")
        String text,

        @NotBlank(message = "Must be specified whether the option is correct or not")
        boolean isCorrect
){}
