package com.gassolutions.order;

import com.gassolutions.common.OrderStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/orders")
@PreAuthorize("hasRole('ADMIN')")
public class AdminOrderController {

    private final OrderService orderService;
    private final OrderRepository orderRepository;

    public AdminOrderController(OrderService orderService, OrderRepository orderRepository) {
        this.orderService = orderService;
        this.orderRepository = orderRepository;
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getOrders(
            @RequestParam(required = false) String status) {
        if (status != null) {
            try {
                OrderStatus s = OrderStatus.valueOf(status.toUpperCase());
                return ResponseEntity.ok(
                        orderRepository.findByStatusOrderByCreatedAtDesc(s).stream()
                                .map(OrderResponse::fromEntity).toList());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            OrderStatus newStatus = OrderStatus.valueOf(body.get("status").toUpperCase());
            return orderRepository.findById(id)
                    .map(order -> {
                        order.setStatus(newStatus);
                        return ResponseEntity.ok(OrderResponse.fromEntity(orderRepository.save(order)));
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Status inválido"));
        }
    }
}
