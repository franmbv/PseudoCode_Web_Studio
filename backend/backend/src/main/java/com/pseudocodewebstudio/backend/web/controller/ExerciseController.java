package com.pseudocodewebstudio.backend.web.controller;

import com.pseudocodewebstudio.backend.domain.dto.request.AnswerRequest;
import com.pseudocodewebstudio.backend.domain.dto.response.ExerciseAdminResponseDto;
import com.pseudocodewebstudio.backend.persistence.entity.Exercise;
import com.pseudocodewebstudio.backend.domain.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {
    private final ExerciseService exerciseService;

    @Autowired
    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping
    public List<ExerciseAdminResponseDto> getAllExercises(){
        return exerciseService.findAllExercises();
    }

    @GetMapping("/{id}")
    public ExerciseAdminResponseDto getExerciseById(@PathVariable Long id) {
        return exerciseService.findExerciseById(id);
    }

    @PostMapping("/submit-answer")
    public boolean submitAnswer(@RequestBody AnswerRequest answerRequest) {
        return exerciseService.checkAnswer(answerRequest.getOptionId());
    }

}
