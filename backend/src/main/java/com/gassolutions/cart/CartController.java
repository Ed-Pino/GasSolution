package com.gassolutions.cart;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<CartResponse> getCart(@RequestParam String sessionId) {
        return ResponseEntity.ok(cartService.getCart(sessionId));
    }

    @PostMapping("/add")
    public ResponseEntity<CartResponse> addItem(@Valid @RequestBody CartRequest request) {
        return ResponseEntity.ok(cartService.addItem(
                request.getSessionId(), request.getItemType(),
                request.getItemId(), request.getQuantity()));
    }

    @PutMapping("/item/{itemId}")
    public ResponseEntity<CartResponse> updateItem(
            @RequestParam String sessionId,
            @PathVariable Long itemId,
            @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.updateItem(sessionId, itemId, quantity));
    }

    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<CartResponse> removeItem(
            @RequestParam String sessionId,
            @PathVariable Long itemId) {
        return ResponseEntity.ok(cartService.removeItem(sessionId, itemId));
    }
}
