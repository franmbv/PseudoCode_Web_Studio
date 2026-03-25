package com.pseudocodewebstudio.backend.web.controller;

import com.pseudocodewebstudio.backend.persistence.crud.CrudUserEntity;
import com.pseudocodewebstudio.backend.persistence.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {
    @Autowired
    private CrudUserEntity userEntityRepository;

    @PostMapping("/complete/{exerciseId}")
    public ResponseEntity<?> completeExercise(@PathVariable Long exerciseId, Authentication authentication) {
        String username = authentication.getName();
        User user = userEntityRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        if(exerciseId > user.getProgress()) {
            user.setProgress(exerciseId);
            userEntityRepository.save(user);
        }
        return ResponseEntity.ok("Exercise " + exerciseId + " completed. Current progress: " + user.getProgress());
    }
}
