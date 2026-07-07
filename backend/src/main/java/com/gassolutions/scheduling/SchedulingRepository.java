package com.gassolutions.scheduling;

import com.gassolutions.common.SchedulingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SchedulingRepository extends JpaRepository<Scheduling, Long> {
    List<Scheduling> findByEstadoOrderByFechaAsignadaDesc(SchedulingStatus estado);
    List<Scheduling> findAllByOrderByFechaAsignadaDesc();
    List<Scheduling> findByOrder_Id(Long orderId);
}
