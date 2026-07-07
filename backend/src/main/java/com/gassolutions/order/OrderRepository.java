package com.gassolutions.order;

import com.gassolutions.common.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatusOrderByCreatedAtDesc(OrderStatus status);
    List<Order> findAllByOrderByCreatedAtDesc();
    List<Order> findBySessionIdOrderByCreatedAtDesc(String sessionId);
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<Order> findByIdAndSessionId(Long id, String sessionId);
    Optional<Order> findByIdAndUserId(Long id, Long userId);
}
