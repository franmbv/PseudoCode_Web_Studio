package com.pseudocodewebstudio.backend.persistence.crud;

import com.pseudocodewebstudio.backend.persistence.entity.Option;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CrudOptionEntity extends JpaRepository<Option, Long> {
    List<Option> findAllByExerciseId(Long exerciseId);
}
