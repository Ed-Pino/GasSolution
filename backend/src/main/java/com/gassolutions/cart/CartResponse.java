package com.gassolutions.cart;

import java.util.List;

public class CartResponse {

    private String sessionId;
    private List<CartItemDTO> items;
    private Double total;

    public CartResponse() {}

    public CartResponse(String sessionId, List<CartItemDTO> items, Double total) {
        this.sessionId = sessionId;
        this.items = items;
        this.total = total;
    }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
    public List<CartItemDTO> getItems() { return items; }
    public void setItems(List<CartItemDTO> items) { this.items = items; }
    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }
}
