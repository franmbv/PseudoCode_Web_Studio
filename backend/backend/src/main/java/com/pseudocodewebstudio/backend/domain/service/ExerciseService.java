package com.pseudocodewebstudio.backend.domain.service;

import com.pseudocodewebstudio.backend.domain.dto.request.ExerciseSaveRequestDto;
import com.pseudocodewebstudio.backend.domain.dto.response.ExerciseAdminResponseDto;
import com.pseudocodewebstudio.backend.domain.dto.response.OptionAdminResponseDto;
import com.pseudocodewebstudio.backend.domain.repository.ExerciseRepository;
import com.pseudocodewebstudio.backend.domain.repository.OptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;

    private final OptionRepository optionRepository;

    @Autowired
    public ExerciseService(ExerciseRepository exerciseRepository, OptionRepository optionRepository) {
        this.exerciseRepository = exerciseRepository;
        this.optionRepository = optionRepository;
    }

    public ExerciseAdminResponseDto findExerciseById(Long id) {
        return exerciseRepository.findExerciseByIdForAdmin(id);
    }

    public List<ExerciseAdminResponseDto> findAllExercises() {
        return exerciseRepository.findAllExercisesForAdmin();
    }

    public ExerciseAdminResponseDto saveExercise(ExerciseSaveRequestDto exercise) {
        return exerciseRepository.saveExercise(exercise);
    }

    public boolean checkAnswer(Long optionID) {
        OptionAdminResponseDto selectedOption = optionRepository.findOptionByIdForAdmin(optionID);
        return selectedOption.isCorrect();
    }

}
