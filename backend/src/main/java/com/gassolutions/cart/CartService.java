package com.gassolutions.cart;

import com.gassolutions.common.ItemType;
import com.gassolutions.product.Product;
import com.gassolutions.product.ProductRepository;
import com.gassolutions.service.ServiceEntity;
import com.gassolutions.service.ServiceRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class CartService {

    private final Map<String, List<CartEntry>> carts = new ConcurrentHashMap<>();
    private final ProductRepository productRepository;
    private final ServiceRepository serviceRepository;

    public CartService(ProductRepository productRepository, ServiceRepository serviceRepository) {
        this.productRepository = productRepository;
        this.serviceRepository = serviceRepository;
    }

    public CartResponse getCart(String sessionId) {
        List<CartEntry> entries = carts.getOrDefault(sessionId, new ArrayList<>());
        List<CartItemDTO> items = entries.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        double total = items.stream().mapToDouble(CartItemDTO::getSubtotal).sum();
        return new CartResponse(sessionId, items, total);
    }

    public CartResponse addItem(String sessionId, ItemType itemType, Long itemId, int quantity) {
        List<CartEntry> entries = carts.computeIfAbsent(sessionId, k -> new ArrayList<>());

        Optional<CartEntry> existing = entries.stream()
                .filter(e -> e.getItemType() == itemType && e.getItemId().equals(itemId))
                .findFirst();

        if (existing.isPresent()) {
            existing.get().setQuantity(existing.get().getQuantity() + quantity);
        } else {
            String nombre = getItemName(itemType, itemId);
            Double price = getItemPrice(itemType, itemId);
            entries.add(new CartEntry(UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE,
                    itemType, itemId, nombre, price, quantity));
        }

        return getCart(sessionId);
    }

    public CartResponse updateItem(String sessionId, Long itemId, int quantity) {
        List<CartEntry> entries = carts.get(sessionId);
        if (entries != null) {
            entries.stream()
                    .filter(e -> e.getId().equals(itemId))
                    .findFirst()
                    .ifPresent(e -> e.setQuantity(quantity));
        }
        return getCart(sessionId);
    }

    public CartResponse removeItem(String sessionId, Long itemId) {
        List<CartEntry> entries = carts.get(sessionId);
        if (entries != null) {
            entries.removeIf(e -> e.getId().equals(itemId));
        }
        return getCart(sessionId);
    }

    public List<CartEntry> getEntries(String sessionId) {
        return carts.getOrDefault(sessionId, new ArrayList<>());
    }

    public void clearCart(String sessionId) {
        carts.remove(sessionId);
    }

    private CartItemDTO toDTO(CartEntry entry) {
        return new CartItemDTO(
                entry.getId(), entry.getItemType(), entry.getItemId(),
                entry.getNombre(), entry.getPrice(), entry.getQuantity(),
                entry.getPrice() * entry.getQuantity()
        );
    }

    private String getItemName(ItemType type, Long id) {
        if (type == ItemType.PRODUCT) {
            return productRepository.findById(id).map(Product::getNombre).orElse("Producto");
        }
        return serviceRepository.findById(id).map(ServiceEntity::getNombre).orElse("Servicio");
    }

    private Double getItemPrice(ItemType type, Long id) {
        if (type == ItemType.PRODUCT) {
            return productRepository.findById(id).map(p -> p.getPrecioCOP().doubleValue()).orElse(0.0);
        }
        return serviceRepository.findById(id).map(s -> s.getPrecioCOP().doubleValue()).orElse(0.0);
    }

    public static class CartEntry {
        private Long id;
        private ItemType itemType;
        private Long itemId;
        private String nombre;
        private Double price;
        private int quantity;

        public CartEntry(Long id, ItemType itemType, Long itemId, String nombre, Double price, int quantity) {
            this.id = id;
            this.itemType = itemType;
            this.itemId = itemId;
            this.nombre = nombre;
            this.price = price;
            this.quantity = quantity;
        }

        public Long getId() { return id; }
        public ItemType getItemType() { return itemType; }
        public Long getItemId() { return itemId; }
        public String getNombre() { return nombre; }
        public Double getPrice() { return price; }
        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }
}
