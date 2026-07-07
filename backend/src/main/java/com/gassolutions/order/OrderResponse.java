package com.gassolutions.order;

import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {
    private Long id;
    private String nombre;
    private String email;
    private String telefono;
    private String direccion;
    private Long subtotal;
    private Long iva;
    private Long total;
    private String status;
    private LocalDateTime createdAt;
    private List<OrderItemResponse> items;

    public static OrderResponse fromEntity(Order order) {
        OrderResponse r = new OrderResponse();
        r.setId(order.getId());
        r.setNombre(order.getNombre());
        r.setEmail(order.getEmail());
        r.setTelefono(order.getTelefono());
        r.setDireccion(order.getDireccion());
        r.setSubtotal(order.getSubtotal());
        r.setIva(order.getIva());
        r.setTotal(order.getTotal());
        r.setStatus(order.getStatus().name());
        r.setCreatedAt(order.getCreatedAt());
        r.setItems(order.getItems().stream().map(OrderItemResponse::fromEntity).toList());
        return r;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
    public Long getSubtotal() { return subtotal; }
    public void setSubtotal(Long subtotal) { this.subtotal = subtotal; }
    public Long getIva() { return iva; }
    public void setIva(Long iva) { this.iva = iva; }
    public Long getTotal() { return total; }
    public void setTotal(Long total) { this.total = total; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public List<OrderItemResponse> getItems() { return items; }
    public void setItems(List<OrderItemResponse> items) { this.items = items; }
}
