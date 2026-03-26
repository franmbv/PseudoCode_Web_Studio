package com.pseudocodewebstudio.backend.persistence.repository_impl;

import com.pseudocodewebstudio.backend.domain.dto.request.OptionSaveRequestDto;
import com.pseudocodewebstudio.backend.domain.dto.response.OptionAdminResponseDto;
import com.pseudocodewebstudio.backend.domain.dto.response.OptionStudentResponseDto;
import com.pseudocodewebstudio.backend.domain.exception.ResourceNotFoundException;
import com.pseudocodewebstudio.backend.domain.repository.OptionRepository;
import com.pseudocodewebstudio.backend.persistence.crud.CrudOptionEntity;
import com.pseudocodewebstudio.backend.persistence.entity.Option;
import com.pseudocodewebstudio.backend.persistence.mapper.OptionMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OptionEntityRepository implements OptionRepository {
    private final CrudOptionEntity crudOptionEntity;
    private final OptionMapper optionMapper;

    public OptionEntityRepository(CrudOptionEntity crudOptionEntity, OptionMapper optionMapper) {
        this.crudOptionEntity = crudOptionEntity;
        this.optionMapper = optionMapper;
    }

    @Override
    public OptionAdminResponseDto findOptionByIdForAdmin(Long optionId) {
        Option optionEntity = this.crudOptionEntity.findById(optionId).orElse(null);
        if(optionEntity == null) {
            throw new ResourceNotFoundException("Exercise with id " + optionId + " does not exist.");
        }
        return this.optionMapper.toAdminResponseDto(optionEntity);
    }

    @Override
    public List<OptionAdminResponseDto> findAllOptionByExerciseIdForAdmin(Long exerciseId) {
        List<Option> options = this.crudOptionEntity.findAllByExerciseId(exerciseId);
        return this.optionMapper.toAdminResponseDto(options);
    }

    @Override
    public OptionStudentResponseDto findOptionByIdForStudent(Long optionId) {
        Option optionEntity = this.crudOptionEntity.findById(optionId).orElse(null);
        if(optionEntity == null) {
            throw new ResourceNotFoundException("Exercise with id " + optionId + " does not exist.");
        }
        return this.optionMapper.toStudentResponseDto(optionEntity);
    }

    @Override
    public List<OptionStudentResponseDto> findAllOptionByExerciseIdForStudent(Long exerciseId) {
        List<Option> options = this.crudOptionEntity.findAllByExerciseId(exerciseId);
        return this.optionMapper.toStudentResponseDto(options);
    }

    @Override
    public OptionAdminResponseDto updateOption(Long optionId, OptionSaveRequestDto optionSaveRequestDto) {
        Option optionEntity = this.crudOptionEntity.findById(optionId).orElse(null);
        if(optionEntity == null) {
            throw new ResourceNotFoundException("Exercise with id " + optionId + " does not exist.");
        }

        this.optionMapper.updateEntityFromDto(optionSaveRequestDto,optionEntity);

        return this.optionMapper.toAdminResponseDto(this.crudOptionEntity.save(optionEntity));
    }

    @Override
    public void deleteOption(Long optionId) {
        if(!this.crudOptionEntity.existsById(optionId)){
            throw new ResourceNotFoundException("Exercise with id " + optionId + " does not exist.");
        }

        this.crudOptionEntity.deleteById(optionId);
    }
}