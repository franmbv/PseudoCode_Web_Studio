package com.pseudocodewebstudio.backend.controller;

import com.pseudocodewebstudio.backend.model.User;
import com.pseudocodewebstudio.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/complete/{exerciseId}")
    public ResponseEntity<?> completeExercise(@PathVariable Long exerciseId, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        if(exerciseId > user.getProgress()) {
            user.setProgress(exerciseId);
            userRepository.save(user);
        }
        return ResponseEntity.ok("Exercise " + exerciseId + " completed. Current progress: " + user.getProgress());
    }
}
