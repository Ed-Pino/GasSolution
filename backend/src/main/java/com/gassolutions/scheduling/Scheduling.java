package com.gassolutions.scheduling;

import com.gassolutions.common.SchedulingStatus;
import com.gassolutions.order.Order;
import com.gassolutions.service.ServiceEntity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "scheduling")
public class Scheduling {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", nullable = false)
    private ServiceEntity service;

    private LocalDateTime fechaAsignada;
    private String tecnico;
    private String notas;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SchedulingStatus estado = SchedulingStatus.PENDING;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
    public ServiceEntity getService() { return service; }
    public void setService(ServiceEntity service) { this.service = service; }
    public LocalDateTime getFechaAsignada() { return fechaAsignada; }
    public void setFechaAsignada(LocalDateTime fechaAsignada) { this.fechaAsignada = fechaAsignada; }
    public String getTecnico() { return tecnico; }
    public void setTecnico(String tecnico) { this.tecnico = tecnico; }
    public String getNotas() { return notas; }
    public void setNotas(String notas) { this.notas = notas; }
    public SchedulingStatus getEstado() { return estado; }
    public void setEstado(SchedulingStatus estado) { this.estado = estado; }
}
