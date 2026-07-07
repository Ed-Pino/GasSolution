package com.gassolutions.order;

import com.gassolutions.cart.CartService;
import com.gassolutions.common.ItemType;
import com.gassolutions.common.OrderStatus;
import com.gassolutions.common.SchedulingStatus;
import com.gassolutions.scheduling.Scheduling;
import com.gassolutions.scheduling.SchedulingRepository;
import com.gassolutions.service.ServiceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private static final double IVA_RATE = 0.19;

    private final OrderRepository orderRepository;
    private final CartService cartService;
    private final ServiceRepository serviceRepository;
    private final SchedulingRepository schedulingRepository;

    public OrderService(OrderRepository orderRepository, CartService cartService,
                        ServiceRepository serviceRepository, SchedulingRepository schedulingRepository) {
        this.orderRepository = orderRepository;
        this.cartService = cartService;
        this.serviceRepository = serviceRepository;
        this.schedulingRepository = schedulingRepository;
    }

    @Transactional
    public OrderResponse checkout(CheckoutRequest request) {
        List<CartService.CartEntry> entries = cartService.getEntries(request.getSessionId());
        if (entries.isEmpty()) {
            throw new IllegalArgumentException("El carrito está vacío");
        }

        Order order = new Order();
        order.setSessionId(request.getSessionId());
        order.setNombre(request.getNombre());
        order.setEmail(request.getEmail());
        order.setTelefono(request.getTelefono());
        order.setDireccion(request.getDireccion());
        order.setStatus(OrderStatus.PENDING);

        long subtotalCents = 0;
        for (CartService.CartEntry entry : entries) {
            long unitPrice = entry.getPrice().longValue();
            long itemSubtotal = unitPrice * entry.getQuantity();
            OrderItem item = new OrderItem();
            item.setItemType(entry.getItemType());
            item.setItemId(entry.getItemId());
            item.setQuantity(entry.getQuantity());
            item.setUnitPrice(unitPrice);
            item.setSubtotal(itemSubtotal);
            order.addItem(item);
            subtotalCents += itemSubtotal;
        }

        long iva = Math.round(subtotalCents * IVA_RATE);
        order.setSubtotal(subtotalCents);
        order.setIva(iva);
        order.setTotal(subtotalCents + iva);

        order = orderRepository.save(order);
        final Order savedOrder = order;

        for (CartService.CartEntry entry : entries) {
            if (entry.getItemType() == ItemType.SERVICE) {
                serviceRepository.findById(entry.getItemId()).ifPresent(service -> {
                    Scheduling scheduling = new Scheduling();
                    scheduling.setOrder(savedOrder);
                    scheduling.setService(service);
                    scheduling.setEstado(SchedulingStatus.PENDING);
                    schedulingRepository.save(scheduling);
                });
            }
        }

        cartService.clearCart(request.getSessionId());
        return OrderResponse.fromEntity(savedOrder);
    }

    public OrderResponse payOrder(Long orderId, String sessionId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException("Orden no encontrada"));
        if (sessionId != null && !sessionId.equals(order.getSessionId())) {
            throw new SecurityException("No autorizado");
        }
        order.setStatus(OrderStatus.PAID);
        return OrderResponse.fromEntity(orderRepository.save(order));
    }

    public Optional<OrderResponse> getOrder(Long id) {
        return orderRepository.findById(id).map(OrderResponse::fromEntity);
    }

    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(OrderResponse::fromEntity).toList();
    }

    public List<OrderResponse> getOrdersBySession(String sessionId) {
        return orderRepository.findBySessionIdOrderByCreatedAtDesc(sessionId).stream()
                .map(OrderResponse::fromEntity).toList();
    }
}
