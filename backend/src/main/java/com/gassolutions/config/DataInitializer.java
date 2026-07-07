package com.gassolutions.config;

import com.gassolutions.common.Role;
import com.gassolutions.product.Product;
import com.gassolutions.product.ProductRepository;
import com.gassolutions.service.ServiceEntity;
import com.gassolutions.service.ServiceRepository;
import com.gassolutions.user.User;
import com.gassolutions.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(ProductRepository productRepository, ServiceRepository serviceRepository,
                           UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.productRepository = productRepository;
        this.serviceRepository = serviceRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (productRepository.count() > 0) return;

        // Admin user
        User admin = new User();
        admin.setEmail("admin@gassolutions.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setNombre("Admin GasSolutions");
        admin.setRol(Role.ADMIN);
        userRepository.save(admin);

        // Products
        productRepository.save(product("Calentador de Paso 10L", "Calentador de paso a gas natural 10 litros/minuto", 890000L, "Calentadores"));
        productRepository.save(product("Calentador de Paso 14L", "Calentador de paso a gas natural 14 litros/minuto", 1200000L, "Calentadores"));
        productRepository.save(product("Calentador Acumulador 50L", "Calentador acumulador a gas 50 litros", 1500000L, "Calentadores"));
        productRepository.save(product("Estufa 4 Bocas", "Estufa a gas 4 bocas con horno", 650000L, "Estufas"));
        productRepository.save(product("Estufa 2 Bocas", "Estufa a gas 2 bocas portátil", 350000L, "Estufas"));
        productRepository.save(product("Estufa 5 Bocas", "Estufa a gas 5 bocas con horno y timer", 890000L, "Estufas"));
        productRepository.save(product("Horno Empotrable 60L", "Horno a gas empotrable 60 litros", 1100000L, "Hornos"));
        productRepository.save(product("Horno de Piso 90L", "Horno de piso a gas 90 litros", 1400000L, "Hornos"));
        productRepository.save(product("Tubo Flexible 1/2\" x 60cm", "Tubo flexible para conexión de gas 1/2 pulgada", 25000L, "Insumos"));
        productRepository.save(product("Válvula de Paso 1/2\"", "Válvula de paso para gas natural 1/2 pulgada", 18000L, "Insumos"));
        productRepository.save(product("Regulador de Gas", "Regulador de presión para gas natural", 45000L, "Insumos"));
        productRepository.save(product("Manguera para Gas 1.5m", "Manguera certificada para gas natural 1.5 metros", 15000L, "Insumos"));
        productRepository.save(product("Termopar Universal", "Termopar universal para calentadores", 12000L, "Repuestos"));
        productRepository.save(product("Llave de Paso", "Llave de paso para gas", 8000L, "Repuestos"));
        productRepository.save(product("Quemador para Estufa", "Quemador completo para estufa 4 bocas", 35000L, "Repuestos"));

        // Services
        serviceRepository.save(service("Instalación Calentador", "Instalación profesional de calentador a gas natural", 120000L, "Calentadores"));
        serviceRepository.save(service("Instalación Estufa", "Instalación profesional de estufa a gas natural", 80000L, "Estufas"));
        serviceRepository.save(service("Instalación Horno", "Instalación profesional de horno a gas natural", 100000L, "Hornos"));
        serviceRepository.save(service("Mantenimiento Preventivo", "Mantenimiento preventivo de equipos a gas", 60000L, null));
        serviceRepository.save(service("Reparación Calentador", "Reparación de calentador a gas incluye diagnóstico", 90000L, "Calentadores"));
        serviceRepository.save(service("Reparación Estufa", "Reparación de estufa a gas incluye diagnóstico", 70000L, "Estufas"));
        serviceRepository.save(service("Reparación Horno", "Reparación de horno a gas incluye diagnóstico", 85000L, "Hornos"));
    }

    private Product product(String nombre, String desc, Long precio, String categoria) {
        Product p = new Product();
        p.setNombre(nombre);
        p.setDescripcion(desc);
        p.setPrecioCOP(precio);
        p.setCategoria(categoria);
        p.setActivo(true);
        return p;
    }

    private ServiceEntity service(String nombre, String desc, Long precio, String categoria) {
        ServiceEntity s = new ServiceEntity();
        s.setNombre(nombre);
        s.setDescripcion(desc);
        s.setPrecioCOP(precio);
        s.setCategoriaAplicable(categoria);
        s.setActivo(true);
        return s;
    }
}
