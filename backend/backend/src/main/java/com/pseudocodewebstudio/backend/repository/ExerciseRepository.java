package com.pseudocodewebstudio.backend.repository;

import com.pseudocodewebstudio.backend.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

}