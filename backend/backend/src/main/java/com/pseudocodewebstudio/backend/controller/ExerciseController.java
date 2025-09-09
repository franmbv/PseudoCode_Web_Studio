package com.pseudocodewebstudio.backend.controller;

import com.pseudocodewebstudio.backend.dto.AnswerRequest;
import com.pseudocodewebstudio.backend.model.Exercise;
import com.pseudocodewebstudio.backend.service.ExerciseService;
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
    public List<Exercise> getAllExercises(){
        return exerciseService.findAllExercises();
    }

    @GetMapping("/{id}")
    public Exercise getExerciseById(@PathVariable Long id) {
        return exerciseService.findExerciseById(id);
    }

    @PostMapping("/submit-answer")
    public boolean submitAnswer(@RequestBody AnswerRequest answerRequest) {
        return exerciseService.checkAnswer(answerRequest.getOptionId());
    }

}
