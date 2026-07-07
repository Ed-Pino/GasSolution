# Requirements — GasSolutions Bogotá

## EARS Requirements Specification

### 1. Ubiquitous (Always active)

| ID   | Requirement | Priority |
|------|-------------|----------|
| U-01 | El sistema mostrará el catálogo de productos sin necesidad de autenticación | High |
| U-02 | El sistema mostrará los precios en Pesos Colombianos (COP) con formato de miles | High |
| U-03 | El sistema mostrará la cantidad solicitada por el cliente en el carrito y en la orden | High |
| U-04 | El sistema identificará al usuario mediante JWT para operaciones protegidas | High |
| U-05 | El sistema mantendrá el carrito de compras en localStorage durante la sesión del invitado | High |
| U-06 | El sistema aplicará IVA del 19% a todos los productos y lo mostrará desglosado en el checkout | High |
| U-07 | El sistema mostrará únicamente productos con `activo = true` en el catálogo público | High |

### 2. Event-Driven (Triggered by an event)

| ID   | Requirement | Priority |
|------|-------------|----------|
| E-01 | Cuando el usuario agregue un producto al carrito, el sistema actualizará el subtotal y el total con IVA | High |
| E-02 | Cuando el usuario elimine un item del carrito, el sistema recalculará el total | High |
| E-03 | Cuando el usuario inicie el checkout, el sistema validará que el carrito no esté vacío | High |
| E-04 | Cuando el usuario confirme el pago, el sistema cambiará el estado de la orden a PAID | High |
| E-05 | Cuando un pedido incluya un servicio y sea pagado, el sistema creará un registro de agenda en estado PENDING | High |
| E-06 | Cuando el admin programe una visita, el sistema cambiará el estado de la agenda a SCHEDULED | High |
| E-07 | Cuando el usuario se registre, el sistema creará un nuevo usuario con rol USER y devolverá un JWT | Medium |
| E-08 | Cuando el admin elimine un producto, el sistema lo marcará como `activo = false` (soft delete) en lugar de eliminarlo físicamente | High |

### 3. Unwanted Behaviour (Error handling)

| ID    | Requirement | Priority |
|-------|-------------|----------|
| UW-01 | Si el producto no existe o está inactivo, entonces el sistema devolverá 404 Not Found | High |
| UW-02 | Si el token JWT ha expirado o es inválido, entonces el sistema devolverá 401 Unauthorized | High |
| UW-03 | Si el email ya está registrado, entonces el sistema devolverá 409 Conflict con mensaje descriptivo | Medium |
| UW-04 | Si el carrito está vacío al hacer checkout, entonces el sistema devolverá 400 Bad Request | High |
| UW-05 | Si ocurre un error interno, entonces el sistema devolverá 500 con mensaje genérico (sin exponer stack trace) | Medium |
| UW-06 | Si un usuario sin rol ADMIN intenta acceder a rutas de admin, el sistema devolverá 403 Forbidden | High |

### 4. State-Driven (Active while in a state)

| ID   | Requirement | Priority |
|------|-------------|----------|
| S-01 | Mientras el usuario tenga items en el carrito, el navbar mostrará un contador con la cantidad total de items | High |
| S-02 | Mientras el usuario esté autenticado como ADMIN, el navbar mostrará enlace al dashboard | High |
| S-03 | Mientras el usuario esté autenticado como USER, el navbar mostrará su nombre y opción de cerrar sesión | Medium |
| S-04 | Mientras el admin esté en el dashboard, podrá gestionar productos, pedidos y agenda | High |

### 5. Optional Feature (Feature-dependent)

| ID   | Requirement | Priority |
|------|-------------|----------|
| O-01 | Donde el usuario esté autenticado, el sistema asociará el carrito (migrado desde localStorage) a su cuenta | Medium |
| O-02 | Donde el usuario esté autenticado, el sistema mostrará el historial de pedidos con su estado actual | Low |
| O-03 | Donde un producto tenga imagen, el sistema la mostrará en el catálogo; en caso contrario mostrará un placeholder | Medium |

### 6. Complex (Combination of triggers)

| ID   | Requirement | Priority |
|------|-------------|----------|
| C-01 | Mientras el pedido esté en estado PAID, cuando el admin asigne una fecha y técnico, el sistema cambiará el estado de la agenda a SCHEDULED | High |
| C-02 | Mientras el carrito contenga un servicio, cuando el usuario haga checkout, el sistema creará la orden con items de producto y servicio combinados | High |
| C-03 | Mientras el usuario esté autenticado, cuando inicie sesión con carrito previo en localStorage, el sistema migrará esos items a su carrito en base de datos | Medium |
