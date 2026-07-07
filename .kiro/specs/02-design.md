# Design — GasSolutions Bogotá

## Arquitectura

### Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Backend | Java + Spring Boot | 17 / 3.4.4 |
| ORM | Spring Data JPA + Hibernate | - |
| DB | H2 (File mode) | - |
| Auth | Spring Security + JWT (jjwt) | 0.12.6 |
| Frontend | React + Vite + TypeScript | 18 / 5 |
| CSS | Tailwind CSS | 3 |
| HTTP Client | Axios | - |

> **Nota migración futura:** El backend usa Spring Data JPA estándar sin SQL nativo específico de H2, por lo que migrar a PostgreSQL en producción solo requiere cambiar el driver y la URL en `application.yml`.

### Diagrama de Arquitectura

```
[Browser]
   └─→ [React SPA (Vite)]
            ├─→ [AuthContext]  — gestiona JWT en localStorage
            ├─→ [CartContext]  — gestiona carrito en localStorage (invitado)
            └─→ [REST API Spring Boot :8080]
                     ├─→ [JwtAuthenticationFilter]
                     ├─→ [SecurityConfig]
                     └─→ [H2 File DB ./data/gassolutions]
```

### Estrategia de Carrito

- **Invitado:** carrito en `localStorage` del navegador (clave `cart`). No requiere backend.
- **Usuario autenticado:** al hacer login, el frontend migra el carrito de `localStorage` a la base de datos (POST `/api/cart/merge`) y limpia `localStorage`.
- **Persistencia:** solo los carritos de usuarios registrados se guardan en BD. Los de invitados viven únicamente en el cliente.

### Base de Datos — Modelo Entidad-Relación

```
┌──────────────┐       ┌─────────────────┐       ┌──────────────┐
│     User     │       │     Product     │       │   Service    │
├──────────────┤       ├─────────────────┤       ├──────────────┤
│ id (PK)      │       │ id (PK)         │       │ id (PK)      │
│ email (UQ)   │       │ nombre          │       │ nombre       │
│ password     │       │ descripcion     │       │ descripcion  │
│ nombre       │       │ precioCOP       │       │ precioCOP    │
│ telefono     │       │ categoria       │       │ categoriaApl │
│ direccion    │       │ imagenUrl (URL) │       │ activo       │
│ rol (U,A)    │       │ activo          │       └──────┬───────┘
│ createdAt    │       └─────────────────┘              │
└──────┬───────┘       └─────────────────┘              │
       │                                                 │
       │  ┌──────────────────┐                           │
       │  │      Order       │                           │
       │  ├──────────────────┤                           │
       └──│ userId (FK, null)│                           │
          │ sessionId (null) │  ← uno de los dos debe    │
          │ nombre           │    estar presente          │
          │ email            │                           │
          │ telefono         │                           │
          │ direccion        │                           │
          │ subtotal         │  ← sin IVA                │
          │ iva              │  ← 19%                    │
          │ total            │  ← subtotal + iva         │
          │ status (enum)    │                           │
          │ createdAt        │                           │
          └────────┬─────────┘                           │
                   │                                     │
          ┌────────▼────────┐                  ┌─────────▼───────┐
          │   OrderItem     │                  │   Scheduling    │
          ├─────────────────┤                  ├─────────────────┤
          │ id (PK)         │                  │ id (PK)         │
          │ orderId (FK)    │                  │ orderId (FK)    │
          │ itemType (P/S)  │                  │ serviceId (FK)  │
          │ itemId          │                  │ fechaAsignada   │
          │ quantity        │                  │ tecnico         │
          │ unitPrice       │  ← precio al     │ estado (enum)   │
          │ subtotal        │    momento de    │ notas           │
          └─────────────────┘    la compra     └─────────────────┘

CartItem (solo para usuarios autenticados)
┌─────────────────┐
│ id (PK)         │
│ userId (FK)     │
│ itemType (P/S)  │
│ itemId          │
│ quantity        │
└─────────────────┘
```

**Enums:**
- `Role`: USER, ADMIN
- `OrderStatus`: PENDING, PAID, CONFIRMED, CANCELLED
- `SchedulingStatus`: PENDING, SCHEDULED, COMPLETED, CANCELLED

### API REST — Endpoints

| Método | Ruta | Auth | Rol | Descripción |
|--------|------|------|-----|-------------|
| POST | /api/auth/register | No | - | Crea usuario y devuelve JWT |
| POST | /api/auth/login | No | - | Autentica y devuelve JWT |
| GET | /api/auth/me | JWT | ANY | Perfil del usuario autenticado |
| GET | /api/products | No | - | Lista productos activos (filtros: categoria, search) |
| GET | /api/products/{id} | No | - | Detalle de producto |
| GET | /api/products/categories | No | - | Lista de categorías disponibles |
| POST | /api/products | JWT | ADMIN | Crear producto |
| PUT | /api/products/{id} | JWT | ADMIN | Editar producto |
| DELETE | /api/products/{id} | JWT | ADMIN | Soft delete (activo=false) |
| GET | /api/services | No | - | Lista servicios activos |
| GET | /api/services/{id} | No | - | Detalle de servicio |
| POST | /api/cart/add | No* | - | Agregar item (solo usuarios autenticados vía BD) |
| GET | /api/cart | JWT | USER | Obtener carrito del usuario |
| PUT | /api/cart/item/{id} | JWT | USER | Cambiar cantidad |
| DELETE | /api/cart/item/{id} | JWT | USER | Eliminar item |
| POST | /api/cart/merge | JWT | USER | Migrar carrito localStorage → BD al login |
| POST | /api/orders/checkout | No** | - | Crear orden desde carrito |
| GET | /api/orders/{id} | No** | - | Consultar orden |
| PUT | /api/orders/{id}/pay | No** | - | Simular pago (valida sessionId o JWT coincidan con la orden) |
| GET | /api/admin/orders | JWT | ADMIN | Listar pedidos (filtro por status) |
| PUT | /api/admin/orders/{id}/status | JWT | ADMIN | Cambiar estado de orden |
| GET | /api/admin/scheduling | JWT | ADMIN | Listar agenda (filtro por estado) |
| PUT | /api/admin/scheduling/{id} | JWT | ADMIN | Asignar fecha, técnico y notas |
| GET | /api/admin/products | JWT | ADMIN | Listar todos los productos (incluye inactivos) |

> *El carrito para invitados vive en `localStorage`. La API de carrito solo aplica a usuarios autenticados.  
> **`PUT /pay` valida que el `sessionId` o `userId` del request coincida con el de la orden para evitar pagos no autorizados.

### Manejo de Errores — Formato estándar

Todas las respuestas de error siguen esta estructura:

```json
{
  "timestamp": "2026-06-25T15:00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Producto no encontrado con id: 99"
}
```

Implementado mediante un `@ControllerAdvice` global (`GlobalExceptionHandler`).

### Frontend — Componentes y Rutas

```
Rutas públicas:
/                       → HomePage (landing + productos destacados)
/products               → ProductsPage (catálogo con filtros de categoría y búsqueda)
/products/:id           → ProductDetailPage (detalle + selector de servicio opcional)
/cart                   → CartPage
/checkout               → CheckoutPage
/order/:id              → OrderConfirmationPage
/login                  → LoginPage
/register               → RegisterPage

Rutas protegidas (USER):
/profile                → ProfilePage (datos + historial de pedidos)

Rutas protegidas (ADMIN):
/admin                  → AdminDashboard (resumen)
/admin/products         → AdminProductsPage (tabla con acciones)
/admin/products/new     → AdminProductForm
/admin/products/:id     → AdminProductForm (edición)
/admin/orders           → AdminOrdersPage (tabla + filtro por estado)
/admin/scheduling       → AdminSchedulingPage (tabla + asignación)

Componentes clave:
├── Layout (Navbar + Footer)
├── Navbar
│   ├── CartBadge (contador de items)
│   └── UserMenu (nombre + logout, o links login/register)
├── ProductCard (imagen, nombre, precio COP)
├── CartItem (cantidad editable, subtotal)
├── ServiceSelector (dropdown para agregar servicio al producto)
├── IVABreakdown (subtotal, IVA 19%, total)
├── AdminSidebar
├── ProtectedRoute (redirige a /login si no autenticado)
└── AdminRoute (redirige a / si no es ADMIN)
```

### Seguridad

- Passwords hasheados con BCrypt (strength 12)
- JWT firmado con clave HMAC-SHA256, expiración 24h
- JWT secret debe cargarse desde variable de entorno `APP_JWT_SECRET` en producción
- Admin routes protegidas con `@PreAuthorize("hasRole('ADMIN')")` en backend
- CORS configurado para `localhost:5173` en desarrollo
- El endpoint `PUT /api/orders/{id}/pay` valida ownership antes de procesar

### Variables de Entorno (producción)

| Variable | Descripción |
|----------|-------------|
| `APP_JWT_SECRET` | Clave secreta para firmar JWT (mín. 32 chars) |
| `SPRING_DATASOURCE_URL` | URL de la base de datos (ej. PostgreSQL) |
| `SPRING_DATASOURCE_USERNAME` | Usuario BD |
| `SPRING_DATASOURCE_PASSWORD` | Contraseña BD |
