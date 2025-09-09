package com.pseudocodewebstudio.backend.service;

import com.pseudocodewebstudio.backend.model.Exercise;
import com.pseudocodewebstudio.backend.model.Option;
import com.pseudocodewebstudio.backend.repository.ExerciseRepository;
import com.pseudocodewebstudio.backend.repository.OptionRepository;
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

    public Exercise findExerciseById(Long id) {
        return exerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise not found with id: " + id));
    }

    public List<Exercise> findAllExercises() {
        return exerciseRepository.findAll();
    }

    public Exercise saveExercise(Exercise exercise) {
        return exerciseRepository.save(exercise);
    }

    public boolean checkAnswer(Long optionID) {
        Option selectedOption = optionRepository.findById(optionID)
                .orElseThrow(() -> new RuntimeException("Option not found with id: " + optionID));
        return selectedOption.isCorrect();
    }

}
