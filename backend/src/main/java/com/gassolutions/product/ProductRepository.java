package com.gassolutions.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByActivoTrue();
    List<Product> findByCategoriaAndActivoTrue(String categoria);
    List<Product> findByNombreContainingIgnoreCaseAndActivoTrue(String nombre);
    Optional<Product> findByIdAndActivoTrue(Long id);

    @Query("SELECT DISTINCT p.categoria FROM Product p WHERE p.activo = true ORDER BY p.categoria")
    List<String> findDistinctCategorias();
}
