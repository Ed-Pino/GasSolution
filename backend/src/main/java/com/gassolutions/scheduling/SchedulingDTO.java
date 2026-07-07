package com.gassolutions.scheduling;

import java.time.LocalDateTime;

public class SchedulingDTO {

    private Long id;
    private Long orderId;
    private Long serviceId;
    private String nombreServicio;
    private LocalDateTime fechaAsignada;
    private String tecnico;
    private String estado;
    private String notas;

    public static SchedulingDTO fromEntity(Scheduling s) {
        SchedulingDTO dto = new SchedulingDTO();
        dto.setId(s.getId());
        dto.setOrderId(s.getOrder().getId());
        dto.setServiceId(s.getService().getId());
        dto.setNombreServicio(s.getService().getNombre());
        dto.setFechaAsignada(s.getFechaAsignada());
        dto.setTecnico(s.getTecnico());
        dto.setEstado(s.getEstado().name());
        dto.setNotas(s.getNotas());
        return dto;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }
    public String getNombreServicio() { return nombreServicio; }
    public void setNombreServicio(String nombreServicio) { this.nombreServicio = nombreServicio; }
    public LocalDateTime getFechaAsignada() { return fechaAsignada; }
    public void setFechaAsignada(LocalDateTime fechaAsignada) { this.fechaAsignada = fechaAsignada; }
    public String getTecnico() { return tecnico; }
    public void setTecnico(String tecnico) { this.tecnico = tecnico; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public String getNotas() { return notas; }
    public void setNotas(String notas) { this.notas = notas; }
}
