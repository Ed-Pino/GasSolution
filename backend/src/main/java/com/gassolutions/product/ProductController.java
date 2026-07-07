package com.gassolutions.product;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getProducts(
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String search) {
        List<Product> products;
        if (search != null && !search.isEmpty()) {
            products = productRepository.findByNombreContainingIgnoreCaseAndActivoTrue(search);
        } else if (categoria != null && !categoria.isEmpty()) {
            products = productRepository.findByCategoriaAndActivoTrue(categoria);
        } else {
            products = productRepository.findByActivoTrue();
        }
        return ResponseEntity.ok(products.stream().map(ProductDTO::fromEntity).toList());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(productRepository.findDistinctCategorias());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) {
        return productRepository.findByIdAndActivoTrue(id)
                .map(p -> ResponseEntity.ok(ProductDTO.fromEntity(p)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO dto) {
        return ResponseEntity.ok(ProductDTO.fromEntity(productRepository.save(dto.toEntity())));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductDTO dto) {
        return productRepository.findById(id)
                .map(p -> {
                    p.setNombre(dto.getNombre());
                    p.setDescripcion(dto.getDescripcion());
                    p.setPrecioCOP(dto.getPrecioCOP());
                    p.setCategoria(dto.getCategoria());
                    p.setImagenUrl(dto.getImagenUrl());
                    if (dto.getActivo() != null) p.setActivo(dto.getActivo());
                    return ResponseEntity.ok(ProductDTO.fromEntity(productRepository.save(p)));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(p -> {
                    p.setActivo(false);
                    productRepository.save(p);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
