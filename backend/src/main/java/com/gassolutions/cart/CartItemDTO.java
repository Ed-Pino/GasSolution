package com.gassolutions.cart;

import com.gassolutions.common.ItemType;

public class CartItemDTO {

    private Long id;
    private ItemType itemType;
    private Long itemId;
    private String nombre;
    private Double precioUnitario;
    private Integer quantity;
    private Double subtotal;

    public CartItemDTO() {}

    public CartItemDTO(Long id, ItemType itemType, Long itemId, String nombre, Double precioUnitario, Integer quantity, Double subtotal) {
        this.id = id;
        this.itemType = itemType;
        this.itemId = itemId;
        this.nombre = nombre;
        this.precioUnitario = precioUnitario;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public ItemType getItemType() { return itemType; }
    public void setItemType(ItemType itemType) { this.itemType = itemType; }
    public Long getItemId() { return itemId; }
    public void setItemId(Long itemId) { this.itemId = itemId; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public Double getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(Double precioUnitario) { this.precioUnitario = precioUnitario; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public Double getSubtotal() { return subtotal; }
    public void setSubtotal(Double subtotal) { this.subtotal = subtotal; }
}
