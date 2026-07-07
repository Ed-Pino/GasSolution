package com.gassolutions.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ProductDTO {

    private Long id;

    @NotBlank
    private String nombre;

    private String descripcion;

    @NotNull @Positive
    private Long precioCOP;

    @NotBlank
    private String categoria;

    private String imagenUrl;
    private Boolean activo;

    public ProductDTO() {}

    public static ProductDTO fromEntity(Product p) {
        ProductDTO dto = new ProductDTO();
        dto.setId(p.getId());
        dto.setNombre(p.getNombre());
        dto.setDescripcion(p.getDescripcion());
        dto.setPrecioCOP(p.getPrecioCOP());
        dto.setCategoria(p.getCategoria());
        dto.setImagenUrl(p.getImagenUrl());
        dto.setActivo(p.getActivo());
        return dto;
    }

    public Product toEntity() {
        Product p = new Product();
        p.setNombre(this.nombre);
        p.setDescripcion(this.descripcion);
        p.setPrecioCOP(this.precioCOP);
        p.setCategoria(this.categoria);
        p.setImagenUrl(this.imagenUrl);
        p.setActivo(this.activo != null ? this.activo : true);
        return p;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public Long getPrecioCOP() { return precioCOP; }
    public void setPrecioCOP(Long precioCOP) { this.precioCOP = precioCOP; }
    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }
    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }
}
