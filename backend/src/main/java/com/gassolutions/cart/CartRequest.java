package com.gassolutions.cart;

import com.gassolutions.common.ItemType;
import jakarta.validation.constraints.NotNull;

public class CartRequest {

    private String sessionId;

    @NotNull
    private ItemType itemType;

    @NotNull
    private Long itemId;

    private Integer quantity = 1;

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
    public ItemType getItemType() { return itemType; }
    public void setItemType(ItemType itemType) { this.itemType = itemType; }
    public Long getItemId() { return itemId; }
    public void setItemId(Long itemId) { this.itemId = itemId; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
