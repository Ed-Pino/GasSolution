package com.gassolutions.service;

public class ServiceDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private Long precioCOP;
    private String categoriaAplicable;
    private String imagenUrl;
    private Boolean activo;

    public ServiceDTO() {}

    public static ServiceDTO fromEntity(ServiceEntity s) {
        ServiceDTO dto = new ServiceDTO();
        dto.setId(s.getId());
        dto.setNombre(s.getNombre());
        dto.setDescripcion(s.getDescripcion());
        dto.setPrecioCOP(s.getPrecioCOP());
        dto.setCategoriaAplicable(s.getCategoriaAplicable());
        dto.setImagenUrl(s.getImagenUrl());
        dto.setActivo(s.getActivo());
        return dto;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public Long getPrecioCOP() { return precioCOP; }
    public void setPrecioCOP(Long precioCOP) { this.precioCOP = precioCOP; }
    public String getCategoriaAplicable() { return categoriaAplicable; }
    public void setCategoriaAplicable(String categoriaAplicable) { this.categoriaAplicable = categoriaAplicable; }
    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }
    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }
}
