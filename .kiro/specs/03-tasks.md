# Tasks — GasSolutions Bogotá

## Estado del proyecto

| Símbolo | Significado |
|---------|-------------|
| ✅ | Completado |
| 🔄 | En progreso |
| ⬜ | Pendiente |

---

## TASK-01: Setup Spring Boot + H2 + Entidades ✅

- ✅ Proyecto Spring Boot con Maven creado
- ✅ Dependencias: web, jpa, h2, security, validation, lombok, jjwt 0.12.6
- ✅ application.yml con H2 file mode, JWT config
- ✅ Enums: `Role`, `OrderStatus`, `SchedulingStatus`, `ItemType`
- ✅ Entidades JPA: `User`, `Product`, `Service` (ServiceEntity), `Order`, `OrderItem`, `Scheduling`
- ✅ Repositories para cada entidad
- ✅ `GlobalExceptionHandler` (@ControllerAdvice) con formato estándar de error
- ✅ `DataInitializer` con 15 productos y 7 servicios de ejemplo + usuario admin

**Categorías:** Calentadores, Estufas, Hornos, Insumos, Repuestos  
**Admin por defecto:** admin@gassolutions.com / admin123

---

## TASK-03: API Productos ✅

- ✅ Entidad `Product`: id, nombre, descripcion, precioCOP (Long), categoria (String), imagenUrl, activo
- ✅ `ProductRepository` con filtros por categoría, búsqueda y categorías distintas
- ✅ DTOs: `ProductDTO` (validaciones @NotBlank, @Positive)
- ✅ `ProductController` público: `GET /api/products`, `GET /api/products/{id}`, `GET /api/products/categories`
- ✅ Admin endpoints: `POST`, `PUT`, `DELETE /api/products/{id}` (soft delete)

---

## TASK-04: API Servicios ✅

- ✅ Entidad `ServiceEntity`: id, nombre, descripcion, precioCOP (Long), categoriaAplicable (String), activo
- ✅ `ServiceRepository`, `ServiceDTO`
- ✅ `ServiceController` público: `GET /api/services`, `GET /api/services/{id}`

---

## TASK-05: API Auth (JWT) ✅

- ✅ Entidad `User`: id, email, password, nombre, telefono, direccion, rol, createdAt
- ✅ `UserRepository`
- ✅ `JwtService`: genera token con id, email, rol en claims
- ✅ `JwtAuthenticationFilter` (OncePerRequestFilter)
- ✅ `SecurityConfig`: rutas públicas y protegidas, CSRF deshabilitado, CORS configurado
- ✅ `AuthController`: register (devuelve JWT), login (devuelve JWT + datos), me
- ✅ DTOs: `RegisterRequest`, `LoginRequest`, `AuthResponse`

---

## TASK-10: API Checkout + pago simulado ✅

- ✅ Entidades `Order` (subtotal, iva, total como Long) y `OrderItem` (unitPrice, subtotal)
- ✅ `OrderService`: checkout calcula subtotal/iva(19%)/total, crea Scheduling si hay servicio
- ✅ `OrderController`: checkout, getOrder, pay (valida sessionId)
- ✅ `AdminOrderController`: listar con filtro por status, cambiar estado

---

## TASK-12: Admin API (scheduling) ✅

- ✅ `Scheduling` con relaciones JPA a Order y ServiceEntity
- ✅ `AdminSchedulingController`: listar con filtro, asignar fecha/técnico/notas/estado

---

## TASK-02: Setup React + Vite + Tailwind + Routing ⬜

- ⬜ `npm create vite@latest frontend -- --template react-ts`
- ⬜ Instalar dependencias: `tailwindcss`, `react-router-dom`, `axios`
- ⬜ Configurar Tailwind (`tailwind.config.js`, `index.css`)
- ⬜ Routing base con `BrowserRouter` y rutas vacías
- ⬜ Layout con `Navbar` y `Footer`
- ⬜ `AuthContext` con estado de usuario (leer JWT de localStorage al iniciar)
- ⬜ `CartContext` con estado de carrito (leer desde localStorage al iniciar)
- ⬜ `ProtectedRoute` y `AdminRoute` components

---

## TASK-03: API Productos ✅

*(ver TASK-01 — completado en conjunto)*

---

## TASK-04: API Servicios ✅

*(ver TASK-01 — completado en conjunto)*

---

## TASK-05: API Auth (JWT) ✅

*(ver TASK-01 — completado en conjunto)*

---

## TASK-06: Frontend Auth ⬜

- ⬜ `LoginPage` con formulario (email, password) + manejo de errores
- ⬜ `RegisterPage` con formulario (nombre, email, password, teléfono, dirección)
- ⬜ `AuthContext`: login (guarda JWT en localStorage), logout (limpia estado y localStorage), user state
- ⬜ Navbar: mostrar nombre + logout si autenticado, o links login/register si no

---

## TASK-07: Frontend catálogo ⬜

- ⬜ `ProductCard`: imagen (o placeholder), nombre, precio COP formateado
- ⬜ `ProductsPage`: grid de cards, filtro por categoría (tabs), búsqueda por texto (debounced)
- ⬜ `ProductDetailPage`: info completa, selector cantidad, `ServiceSelector` dropdown, botón "Agregar al carrito"
- ⬜ `ServiceSelector`: dropdown con servicios disponibles, precio adicional visible

---

## TASK-08: Lógica de Carrito — Frontend (localStorage) ⬜

- ⬜ `CartContext`: estado en memoria + sincronizado con `localStorage`
  - `addItem(item)`: agrega o incrementa cantidad
  - `removeItem(id, type)`: elimina item
  - `updateQuantity(id, type, qty)`: actualiza cantidad
  - `clearCart()`: vacía carrito
  - `total`, `itemCount` computados
- ⬜ `CartPage`: lista de items con `CartItem`, cantidades editables, `IVABreakdown` (subtotal + IVA 19% + total), botón "Ir al checkout"
- ⬜ `CartBadge` en Navbar con contador de items
- ⬜ Al hacer login, llamar `POST /api/cart/merge` y limpiar localStorage

---

## TASK-09: API Carrito (usuarios autenticados) ⬜

- ⬜ Entidad `CartItem`: id, userId, itemType (PRODUCT/SERVICE), itemId, quantity
- ⬜ `CartItemRepository`, `CartService`
- ⬜ Endpoints JWT:
  - `GET /api/cart` — obtener carrito del usuario
  - `PUT /api/cart/item/{id}` — actualizar cantidad
  - `DELETE /api/cart/item/{id}` — eliminar item
  - `POST /api/cart/merge` — recibir lista de items desde localStorage y fusionar con carrito existente

---

## TASK-10: API Checkout + pago simulado ✅

*(ver TASK-01 — completado en conjunto)*

---

## TASK-11: Frontend Checkout + Confirmación ⬜

- ⬜ `CheckoutPage`: formulario datos (nombre, email, teléfono, dirección), resumen de orden con `IVABreakdown`, botón "Confirmar y pagar"
- ⬜ `OrderConfirmationPage`: número de orden, estado, resumen de items, mensaje de agenda si aplica

---

## TASK-12: Admin API ✅

*(ver TASK-01 — completado en conjunto)*

---

## TASK-13: Admin Frontend ⬜

- ⬜ `AdminLayout` con `AdminSidebar` (links: productos, pedidos, agenda)
- ⬜ `AdminDashboard`: contadores resumen (pedidos pendientes, agenda pendiente, productos activos)
- ⬜ `AdminProductsPage`: tabla con columnas (nombre, categoría, precio, activo), botones editar/eliminar
- ⬜ `AdminProductForm`: formulario crear/editar con validación client-side
- ⬜ `AdminOrdersPage`: tabla con filtro por estado, botón cambiar estado
- ⬜ `AdminSchedulingPage`: tabla de agenda, form asignación (fecha, técnico, notas)

---

## TASK-14: ProfilePage (historial de pedidos) ⬜

- ⬜ `ProfilePage` (ruta protegida USER)
- ⬜ Mostrar datos del usuario
- ⬜ Historial de pedidos con estado actual (requiere `GET /api/orders?userId=` o endpoint dedicado)
- ⬜ Endpoint backend: `GET /api/orders/my` (JWT requerido, devuelve órdenes del usuario autenticado)

---

## TASK-15: Integración final + calidad ⬜

### Escenarios críticos a validar:

**Flujo invitado:**
- [ ] Navegar catálogo → agregar producto → agregar servicio → checkout → pagar → ver confirmación

**Flujo usuario registrado:**
- [ ] Registrarse → login → carrito localStorage migrado → checkout → ver historial en perfil

**Flujo admin:**
- [ ] Login admin → gestionar productos (crear, editar, soft delete)
- [ ] Ver pedido PAID → asignar fecha en agenda → verificar estado SCHEDULED
- [ ] Intentar acceder a /admin sin rol ADMIN → recibir 403

**Casos de error:**
- [ ] Checkout con carrito vacío → error 400
- [ ] Token expirado → redirigir a login automáticamente

### Tareas de calidad:
- [ ] Manejo global de errores en frontend (interceptor Axios → toast de error)
- [ ] Loading states en todas las llamadas API
- [ ] Responsive design (mobile-first con Tailwind)
- [ ] Limpieza de console.log y código muerto
