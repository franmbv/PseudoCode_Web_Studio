package com.pseudocodewebstudio.backend.domain.repository;

import com.pseudocodewebstudio.backend.domain.dto.request.OptionSaveRequestDto;
import com.pseudocodewebstudio.backend.domain.dto.response.OptionAdminResponseDto;
import com.pseudocodewebstudio.backend.domain.dto.response.OptionStudentResponseDto;

import java.util.List;

public interface OptionRepository {

    // Read for admin
    OptionAdminResponseDto findOptionByIdForAdmin(Long optionId);
    List<OptionAdminResponseDto> findAllOptionByExerciseIdForAdmin(Long exerciseId);

    // Read for user
    OptionStudentResponseDto findOptionByIdForStudent(Long optionId);
    List<OptionStudentResponseDto> findAllOptionByExerciseIdForStudent(Long exerciseId);

    // Update
    OptionAdminResponseDto updateOption(Long optionId, OptionSaveRequestDto optionSaveRequestDto);

    // Delete
    void deleteOption(Long optionId);
}
