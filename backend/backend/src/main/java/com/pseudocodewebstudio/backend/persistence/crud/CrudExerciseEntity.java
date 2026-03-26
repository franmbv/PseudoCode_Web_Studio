package com.pseudocodewebstudio.backend.persistence.crud;

import com.pseudocodewebstudio.backend.persistence.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrudExerciseEntity extends JpaRepository<Exercise, Long> {
    Exercise findFirstByTitle(String title);
}
