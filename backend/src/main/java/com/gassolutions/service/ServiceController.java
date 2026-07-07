package com.gassolutions.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceRepository serviceRepository;

    public ServiceController(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @GetMapping
    public ResponseEntity<List<ServiceDTO>> getServices() {
        return ResponseEntity.ok(
                serviceRepository.findByActivoTrue().stream()
                        .map(ServiceDTO::fromEntity).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceDTO> getService(@PathVariable Long id) {
        return serviceRepository.findById(id)
                .map(s -> ResponseEntity.ok(ServiceDTO.fromEntity(s)))
                .orElse(ResponseEntity.notFound().build());
    }
}
