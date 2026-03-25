package com.pseudocodewebstudio.backend.persistence.mapper;

import com.pseudocodewebstudio.backend.domain.dto.request.OptionSaveRequestDto;
import com.pseudocodewebstudio.backend.domain.dto.response.OptionAdminResponseDto;
import com.pseudocodewebstudio.backend.domain.dto.response.OptionStudentResponseDto;
import com.pseudocodewebstudio.backend.persistence.entity.Option;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OptionMapper {

    Option toEntity(OptionSaveRequestDto optionSaveRequestDto);
    List<Option> toEntity(List<OptionSaveRequestDto> optionSaveRequestDto);

    OptionStudentResponseDto toStudentResponseDto(Option option);
    List<OptionStudentResponseDto> toStudentResponseDto(List<Option> options);

    OptionAdminResponseDto toAdminResponseDto(Option option);
    List<OptionAdminResponseDto> toAdminResponseDto(List<Option> options);

    void updateEntityFromDto(OptionSaveRequestDto optionSaveRequestDto,@MappingTarget Option option);
}
