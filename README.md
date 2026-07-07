<div align="center">

# 🔥 GasSolutions · E-Commerce de Gasodomésticos

**Plataforma de venta online y agendamiento de servicios técnicos de gas natural en Bogotá**

![Version](https://img.shields.io/badge/versión-1.0.0-f5a623?style=for-the-badge)
![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4.4-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![H2](https://img.shields.io/badge/H2-Database-1C4E80?style=for-the-badge)
![License](https://img.shields.io/badge/licencia-MIT-52d68a?style=for-the-badge)

[Descripción](#-descripción) · [Arquitectura](#-arquitectura) · [Tecnologías](#-stack-tecnológico) · [Requisitos](#-requisitos-previos) · [Instalación](#-instalación) · [Ejecución](#-ejecución) · [API](#-api) · [Estructura](#-estructura-del-proyecto)

</div>

---

## 📋 Descripción

**GasSolutions** es una plataforma e-commerce especializada en gasodomésticos y servicios técnicos de gas natural para Bogotá, Colombia. Permite a los clientes:

1. **Explorar** el catálogo de productos: calentadores, estufas, hornos, insumos y repuestos
2. **Agregar** productos y servicios al carrito sin necesidad de cuenta
3. **Agendar** servicios de instalación, mantenimiento y reparación
4. **Realizar checkout** con cálculo automático de IVA (19%)
5. **Administrar** productos, órdenes y agendamiento desde un panel admin

### Características principales

> - 🛒 Carrito sin login — identificado por `sessionId` en `localStorage`
> - 🔐 Autenticación JWT con roles `USER` y `ADMIN`
> - 📅 Agendamiento automático de servicios técnicos al hacer checkout
> - 💰 Precios en COP con IVA desglosado
> - 📱 UI responsiva optimizada para móvil

---

## 🏗 Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                      GASSOLUTIONS SYSTEM                        │
│                                                                 │
│  ┌──────────────┐    ┌─────────────────────────────────────┐   │
│  │    React 19  │    │         Spring Boot 3.4.4            │   │
│  │  + TypeScript│◄──►│                                     │   │
│  │  + Tailwind  │    │  ┌──────────┐  ┌────────────────┐  │   │
│  │  + Vite 8    │    │  │  Auth    │  │   Products     │  │   │
│  └──────────────┘    │  │  (JWT)   │  │   Services     │  │   │
│                      │  └──────────┘  └────────────────┘  │   │
│  Vite proxy          │  ┌──────────┐  ┌────────────────┐  │   │
│  /api/* → :8080      │  │   Cart   │  │    Orders      │  │   │
│                      │  │(session) │  │  + Scheduling  │  │   │
│                      │  └──────────┘  └────────────────┘  │   │
│                      └──────────────────────┬──────────────┘   │
│                                             │                   │
│                      ┌──────────────────────▼──────────────┐   │
│                      │     H2 File Database                 │   │
│                      │   ./data/gassolutions.mv.db          │   │
│                      └──────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Estructura de paquetes (Backend — Package by Feature)

```
com.gassolutions/
├── auth/          ← Login, register, JWT
├── cart/          ← Carrito por sessionId
├── order/         ← Checkout, estados de orden
├── product/       ← CRUD productos
├── service/       ← Servicios técnicos
├── scheduling/    ← Agendamiento admin
├── user/          ← Entidad usuario
├── common/        ← Enums compartidos
└── config/        ← Security, JWT, CORS, DataInitializer
```

---

## 🛠 Stack Tecnológico

### Backend

| Tecnología | Versión | Uso |
|---|---|---|
| **Java** | 17 | Lenguaje principal |
| **Spring Boot** | 3.4.4 | Framework web y DI |
| **Spring Security** | 6.x | Autenticación y autorización |
| **Spring Data JPA** | 3.4.4 | ORM / persistencia |
| **H2 Database** | File-based | Base de datos embebida |
| **jjwt** | 0.12.6 | Generación y validación JWT |
| **BCrypt** | — | Hash de contraseñas |
| **Lombok** | 1.18.x | Reducción de boilerplate |
| **Maven** | 3.9+ | Build tool |

### Frontend

| Tecnología | Versión | Uso |
|---|---|---|
| **React** | 19 | UI Framework |
| **TypeScript** | 6 | Tipado estático |
| **Vite** | 8 | Build tool y dev server |
| **Tailwind CSS** | 4 | Estilos utility-first |
| **React Router DOM** | 7 | Enrutamiento SPA |
| **Axios** | Latest | Cliente HTTP centralizado |
| **oxlint** | — | Linter |

---

## ✅ Requisitos Previos

| Herramienta | Versión Mínima | Verificar |
|---|---|---|
| **Java JDK** | 17+ | `java -version` |
| **Maven** | 3.9+ | `mvn -version` |
| **Node.js** | 18+ | `node -v` |
| **npm** | 9+ | `npm -v` |
| **Git** | 2.x | `git --version` |

> **Windows:** Usa `mvnw.cmd` en lugar de `./mvnw` en todos los comandos del backend.

---

## 📥 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/ecommerce-gas.git
cd ecommerce-gas
```

Estructura raíz:

```
ecommerce-gas/
├── backend/          ← Spring Boot 3.4.4
├── frontend/         ← React 19 + Vite 8
└── README.md
```

### 2. Instalar dependencias del frontend

```bash
cd frontend
npm install
```

### 3. Configuración del backend

El backend usa H2 file-based, no requiere instalar ninguna base de datos.
La configuración está en `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:h2:file:./data/gassolutions
    username: sa
    password:
  h2:
    console:
      enabled: true     # http://localhost:8080/h2-console

app:
  jwt:
    secret: tu_clave_secreta_aqui
    expiration-ms: 86400000   # 24 horas

server:
  port: 8080
```

---

## 🚀 Ejecución

### Backend (desde `/backend`)

```bash
# Windows
mvnw.cmd spring-boot:run

# Linux / Mac
./mvnw spring-boot:run

# Compilar JAR
mvnw.cmd clean package -DskipTests
java -jar target/gassolutions-*.jar
```

El backend inicia en: `http://localhost:8080`

### Frontend (desde `/frontend`)

```bash
# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

El frontend inicia en: `http://localhost:5173`

### Servicios disponibles

| Servicio | URL |
|---|---|
| Frontend React | http://localhost:5173 |
| Backend API | http://localhost:8080 |
| H2 Console | http://localhost:8080/h2-console |

---

## 📡 API

### Autenticación

```http
# Registro
POST /api/auth/register
Content-Type: application/json
{
  "email": "usuario@ejemplo.com",
  "password": "password123",
  "nombre": "Juan Pérez"
}

# Login
POST /api/auth/login
Content-Type: application/json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

Respuesta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "userId": 1,
  "email": "usuario@ejemplo.com",
  "nombre": "Juan Pérez",
  "rol": "USER"
}
```

### Productos

```http
# Listar productos (con filtros opcionales)
GET /api/products?categoria=Calentadores&search=rheem

# Producto por ID
GET /api/products/{id}

# Crear producto (ADMIN)
POST /api/products
Authorization: Bearer {token}

# Actualizar producto (ADMIN)
PUT /api/products/{id}
Authorization: Bearer {token}

# Desactivar producto (ADMIN, soft delete)
DELETE /api/products/{id}
Authorization: Bearer {token}
```

### Carrito

```http
# Ver carrito
GET /api/cart?sessionId={sessionId}

# Agregar ítem
POST /api/cart/add
{
  "sessionId": "uuid",
  "itemType": "PRODUCT",   # o "SERVICE"
  "itemId": 1,
  "quantity": 1
}

# Actualizar cantidad
PUT /api/cart/item/{itemId}?sessionId={sessionId}&quantity=2

# Eliminar ítem
DELETE /api/cart/item/{itemId}?sessionId={sessionId}
```

### Checkout

```http
POST /api/orders/checkout
{
  "sessionId": "uuid",
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "telefono": "3001234567",
  "direccion": "Calle 100 # 15-20, Bogotá"
}

# Pagar orden
PUT /api/orders/{id}/pay
Authorization: Bearer {token}  # opcional
```

### Rutas Admin (requieren `ROLE_ADMIN`)

```http
# Órdenes
GET    /api/admin/orders
PUT    /api/admin/orders/{id}/status

# Agendamiento
GET    /api/admin/scheduling
PUT    /api/admin/scheduling/{id}

# Servicios técnicos
POST   /api/admin/services
PUT    /api/admin/services/{id}
DELETE /api/admin/services/{id}
```

### Autenticación en peticiones protegidas

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

---

## 👥 Usuarios del Sistema

| Rol | Email | Contraseña | Permisos |
|---|---|---|---|
| **ADMIN** | `admin@gassolutions.com` | `admin123` | Gestión completa de productos, órdenes y agendamiento |
| **USER** | Registro libre | — | Carrito, checkout, historial de órdenes |
| **Anónimo** | Sin cuenta | — | Catálogo, carrito, checkout |

> Los datos iniciales se cargan automáticamente via `DataInitializer` al arrancar el backend.

---

## 🔄 Flujo de Compra

```
┌─────────────────────────────────────────────────────────┐
│  Cliente entra al sitio                                 │
│  └─ Se genera sessionId automáticamente                 │
│                                                         │
│  1. CATÁLOGO                                            │
│     └─ Navega productos / servicios                     │
│     └─ Filtra por categoría o búsqueda                  │
│                                                         │
│  2. CARRITO (sin login)                                 │
│     └─ Agrega productos y/o servicios                   │
│     └─ Visualiza subtotal + IVA 19%                     │
│                                                         │
│  3. CHECKOUT                                            │
│     └─ Ingresa datos de entrega                         │
│     └─ Confirma orden → Estado: PENDING → PAID          │
│     └─ Si hay servicios → se crea Scheduling(PENDING)   │
│                                                         │
│  4. ADMIN gestiona                                      │
│     └─ Cambia estado orden: PAID → CONFIRMED            │
│     └─ Asigna técnico y fecha al Scheduling             │
│     └─ Scheduling: PENDING → CONFIRMED → COMPLETED      │
└─────────────────────────────────────────────────────────┘
```

### Estados de Orden

```
PENDING → PAID → CONFIRMED
```

### Estados de Agendamiento

```
PENDING → CONFIRMED → COMPLETED
                   └→ CANCELLED
```

---

## 📁 Estructura del Proyecto

```
ecommerce-gas/
│
├── 📄 README.md
│
├── 📂 backend/                              ← Spring Boot 3.4.4
│   ├── pom.xml
│   ├── mvnw / mvnw.cmd
│   ├── data/
│   │   └── gassolutions.mv.db               ← H2 file database
│   └── src/main/
│       ├── java/com/gassolutions/
│       │   ├── GasSolutionsApplication.java  ← Entry point
│       │   ├── 📂 auth/                      ← JWT, login, register
│       │   ├── 📂 cart/                      ← Carrito por sesión
│       │   ├── 📂 order/                     ← Checkout y estados
│       │   ├── 📂 product/                   ← Catálogo productos
│       │   ├── 📂 service/                   ← Servicios técnicos
│       │   ├── 📂 scheduling/                ← Agendamiento
│       │   ├── 📂 user/                      ← Entidad usuario
│       │   ├── 📂 common/                    ← Enums compartidos
│       │   └── 📂 config/                    ← Security, JWT, CORS
│       └── resources/
│           └── application.yml
│
└── 📂 frontend/                             ← React 19 + Vite 8
    ├── package.json
    ├── vite.config.ts
    ├── index.html
    └── src/
        ├── App.tsx                          ← Rutas principales
        ├── main.tsx
        ├── 📂 components/                   ← Navbar, Footer, Cards
        ├── 📂 context/                      ← AuthContext, CartContext
        ├── 📂 pages/
        │   ├── HomePage.tsx
        │   ├── ProductsPage.tsx
        │   ├── ProductDetailPage.tsx
        │   ├── ServicesPage.tsx
        │   ├── CartPage.tsx
        │   ├── CheckoutPage.tsx
        │   ├── OrderConfirmationPage.tsx
        │   ├── LoginPage.tsx
        │   ├── RegisterPage.tsx
        │   └── 📂 admin/                    ← Panel administración
        ├── 📂 services/
        │   └── api.ts                       ← Todas las llamadas API
        └── 📂 types/
            └── index.ts                     ← Interfaces TypeScript
```

---

## 🚨 Solución de Problemas Frecuentes

### `mvnw` no se reconoce (Windows)

```bash
# Usa el wrapper de Windows
mvnw.cmd spring-boot:run

# O instala Maven globalmente y usa
mvn spring-boot:run
```

### Puerto 8080 o 5173 ocupado

```bash
# Windows — ver qué proceso usa el puerto
netstat -ano | findstr :8080
taskkill /PID <PID> /F

netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Error CORS en el frontend

Verifica que el frontend esté corriendo en `http://localhost:5173` (el proxy de Vite solo aplica en dev server). La configuración CORS del backend acepta `localhost:5173` y `localhost:3000`.

### H2 Console — no conecta

```
JDBC URL:  jdbc:h2:file:./data/gassolutions
User Name: sa
Password:  (vacío)
```

Asegúrate de que el backend esté corriendo antes de acceder a `http://localhost:8080/h2-console`.

### El carrito no persiste al recargar

El `sessionId` se guarda en `localStorage`. Si limpias el storage del navegador, se genera un nuevo ID y el carrito queda vacío (comportamiento esperado).

---

## 🗄 Base de Datos

El esquema se crea automáticamente por Hibernate (`ddl-auto: update`) al iniciar.

Tablas principales:

| Tabla | Descripción |
|---|---|
| `users` | Usuarios registrados |
| `products` | Catálogo de productos |
| `services` | Servicios técnicos disponibles |
| `cart_sessions` | Sesiones de carrito activas |
| `cart_items` | Ítems en cada carrito |
| `orders` | Órdenes de compra |
| `order_items` | Detalle de ítems por orden |
| `scheduling` | Citas de servicio técnico |

---

## 🤝 Contribuir

```bash
# 1. Fork del repositorio

# 2. Crea tu rama
git checkout -b feature/nueva-funcionalidad

# 3. Commit con convención
git commit -m "feat: agrega filtro por precio en catálogo"

# 4. Push
git push origin feature/nueva-funcionalidad

# 5. Abre un Pull Request
```

### Convención de commits

```
feat:     Nueva funcionalidad
fix:      Corrección de bug
docs:     Solo documentación
style:    Formato, sin cambios de lógica
refactor: Refactorización
test:     Tests
chore:    Build, dependencias
```

---

## 📄 Licencia

```
MIT License — Copyright (c) 2025 GasSolutions Bogotá
```

---

<div align="center">

**GasSolutions E-Commerce** · Especialistas en gas natural para Bogotá 🔥

[⬆ Volver arriba](#-gassolutions--e-commerce-de-gasodomésticos)

</div>
