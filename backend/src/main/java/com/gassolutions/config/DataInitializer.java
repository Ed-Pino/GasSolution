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
        productRepository.save(product("Calentador de Paso 10L", "Calentador de paso a gas natural 10 litros/minuto", 890000L, "Calentadores", "/images/CalChalleng6lt-1.webp"));
        productRepository.save(product("Calentador de Paso 14L", "Calentador de paso a gas natural 14 litros/minuto", 1200000L, "Calentadores", "/images/bosch14-1.webp"));
        productRepository.save(product("Calentador Acumulador 50L", "Calentador acumulador a gas 50 litros", 1500000L, "Calentadores", "/images/Jacuzzi-Titan-5700-F-Bosch.webp"));
        productRepository.save(product("Estufa 4 Bocas", "Estufa a gas 4 bocas con horno", 650000L, "Estufas", "/images/EstChalleng5puestos1.webp"));
        productRepository.save(product("Estufa 2 Bocas", "Estufa a gas 2 bocas portátil", 350000L, "Estufas", "/images/EstChalleng2puestos1.webp"));
        productRepository.save(product("Estufa 5 Bocas", "Estufa a gas 5 bocas con horno y timer", 890000L, "Estufas", "/images/EstufaEmpotrable.webp"));
        productRepository.save(product("Horno Empotrable 60L", "Horno a gas empotrable 60 litros", 1100000L, "Hornos", "/images/horno-gas1.webp"));
        productRepository.save(product("Horno de Piso 90L", "Horno de piso a gas 90 litros", 1400000L, "Hornos", "/images/horno-gas3.webp"));
        productRepository.save(product("Tubo Flexible 1/2\" x 60cm", "Tubo flexible para conexión de gas 1/2 pulgada", 25000L, "Insumos", "/images/mangeragas.webp"));
        productRepository.save(product("Válvula de Paso 1/2\"", "Válvula de paso para gas natural 1/2 pulgada", 18000L, "Insumos", "/images/valvula2.webp"));
        productRepository.save(product("Regulador de Gas", "Regulador de presión para gas natural", 45000L, "Insumos", "/images/regulador.jpg"));
        productRepository.save(product("Manguera para Gas 1.5m", "Manguera certificada para gas natural 1.5 metros", 15000L, "Insumos", "/images/mangeragas.webp"));
        productRepository.save(product("Termopar Universal", "Termopar universal para calentadores", 12000L, "Repuestos", "/images/repuestos-calentador.jpg"));
        productRepository.save(product("Llave de Paso", "Llave de paso para gas", 8000L, "Repuestos", "/images/repuestos-estufa.jpg"));
        productRepository.save(product("Quemador para Estufa", "Quemador completo para estufa 4 bocas", 35000L, "Repuestos", "/images/Quemador Estufa.webp"));

        // Services
        serviceRepository.save(service("Instalación Calentador", "Instalación profesional de calentador a gas natural", 120000L, "Calentadores", "/images/instalacion-calentador.png"));
        serviceRepository.save(service("Instalación Estufa", "Instalación profesional de estufa a gas natural", 80000L, "Estufas", "/images/estu-ind.png"));
        serviceRepository.save(service("Instalación Horno", "Instalación profesional de horno a gas natural", 100000L, "Hornos", "/images/Insta-horno.png"));
        serviceRepository.save(service("Mantenimiento Preventivo", "Mantenimiento preventivo de equipos a gas", 60000L, null, "/images/mantCalent.png"));
        serviceRepository.save(service("Reparación Calentador", "Reparación de calentador a gas incluye diagnóstico", 90000L, "Calentadores", "/images/repcalenta1.jpg"));
        serviceRepository.save(service("Reparación Estufa", "Reparación de estufa a gas incluye diagnóstico", 70000L, "Estufas", "/images/rep-estufas.jpg"));
        serviceRepository.save(service("Reparación Horno", "Reparación de horno a gas incluye diagnóstico", 85000L, "Hornos", "/images/rephorno.png"));
    }

    private Product product(String nombre, String desc, Long precio, String categoria, String imagenUrl) {
        Product p = new Product();
        p.setNombre(nombre);
        p.setDescripcion(desc);
        p.setPrecioCOP(precio);
        p.setCategoria(categoria);
        p.setImagenUrl(imagenUrl);
        p.setActivo(true);
        return p;
    }

    private ServiceEntity service(String nombre, String desc, Long precio, String categoria, String imagenUrl) {
        ServiceEntity s = new ServiceEntity();
        s.setNombre(nombre);
        s.setDescripcion(desc);
        s.setPrecioCOP(precio);
        s.setCategoriaAplicable(categoria);
        s.setImagenUrl(imagenUrl);
        s.setActivo(true);
        return s;
    }
}
