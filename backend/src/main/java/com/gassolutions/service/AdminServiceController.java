package com.gassolutions.service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/services")
@PreAuthorize("hasRole('ADMIN')")
public class AdminServiceController {

    private final ServiceRepository serviceRepository;

    public AdminServiceController(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @GetMapping
    public ResponseEntity<List<ServiceDTO>> getAll() {
        return ResponseEntity.ok(
                serviceRepository.findAll().stream()
                        .map(ServiceDTO::fromEntity).toList());
    }

    @PostMapping
    public ResponseEntity<ServiceDTO> create(@RequestBody ServiceDTO dto) {
        ServiceEntity entity = new ServiceEntity();
        entity.setNombre(dto.getNombre());
        entity.setDescripcion(dto.getDescripcion());
        entity.setPrecioCOP(dto.getPrecioCOP());
        entity.setCategoriaAplicable(dto.getCategoriaAplicable());
        entity.setImagenUrl(dto.getImagenUrl());
        entity.setActivo(dto.getActivo() != null ? dto.getActivo() : true);
        return ResponseEntity.ok(ServiceDTO.fromEntity(serviceRepository.save(entity)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceDTO> update(@PathVariable Long id, @RequestBody ServiceDTO dto) {
        return serviceRepository.findById(id)
                .map(entity -> {
                    entity.setNombre(dto.getNombre());
                    entity.setDescripcion(dto.getDescripcion());
                    entity.setPrecioCOP(dto.getPrecioCOP());
                    entity.setCategoriaAplicable(dto.getCategoriaAplicable());
                    entity.setImagenUrl(dto.getImagenUrl());
                    entity.setActivo(dto.getActivo() != null ? dto.getActivo() : entity.getActivo());
                    return ResponseEntity.ok(ServiceDTO.fromEntity(serviceRepository.save(entity)));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return serviceRepository.findById(id)
                .map(entity -> {
                    entity.setActivo(false);
                    serviceRepository.save(entity);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
