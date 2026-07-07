package com.gassolutions.scheduling;

import com.gassolutions.common.SchedulingStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/scheduling")
@PreAuthorize("hasRole('ADMIN')")
public class AdminSchedulingController {

    private final SchedulingRepository schedulingRepository;

    public AdminSchedulingController(SchedulingRepository schedulingRepository) {
        this.schedulingRepository = schedulingRepository;
    }

    @GetMapping
    public ResponseEntity<List<SchedulingDTO>> getSchedulings(
            @RequestParam(required = false) String estado) {
        if (estado != null) {
            try {
                SchedulingStatus s = SchedulingStatus.valueOf(estado.toUpperCase());
                return ResponseEntity.ok(
                        schedulingRepository.findByEstadoOrderByFechaAsignadaDesc(s).stream()
                                .map(SchedulingDTO::fromEntity).toList());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.ok(
                schedulingRepository.findAllByOrderByFechaAsignadaDesc().stream()
                        .map(SchedulingDTO::fromEntity).toList());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> schedule(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return schedulingRepository.findById(id)
                .map(s -> {
                    if (body.containsKey("fecha")) {
                        s.setFechaAsignada(LocalDateTime.parse(body.get("fecha")));
                    }
                    if (body.containsKey("tecnico")) {
                        s.setTecnico(body.get("tecnico"));
                    }
                    if (body.containsKey("estado")) {
                        s.setEstado(SchedulingStatus.valueOf(body.get("estado").toUpperCase()));
                    }
                    if (body.containsKey("notas")) {
                        s.setNotas(body.get("notas"));
                    }
                    schedulingRepository.save(s);
                    return ResponseEntity.ok(SchedulingDTO.fromEntity(s));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
