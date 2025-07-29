package com.pseudocodewebstudio.backend.repository;

import com.pseudocodewebstudio.backend.model.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionRepository extends JpaRepository<Option, Long> {
    
}