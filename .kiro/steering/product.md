# Product: GasSolutions E-Commerce Platform

GasSolutions is an e-commerce platform for a gas appliance company based in Bogotá, Colombia. It allows customers to browse and purchase gas products (water heaters, stoves, ovens, parts) and schedule professional installation or repair services.

## Core Domains

- **Products** — Gas appliances and supplies sold online (calentadores, estufas, hornos, insumos, repuestos)
- **Services** — Professional installation, maintenance, and repair services that can be booked alongside or independently of products
- **Cart** — Session-based cart (no login required) that supports both products and services as line items
- **Orders** — Checkout flow that creates orders and automatically schedules service appointments for any service items
- **Scheduling** — Admin-managed schedule for service appointments created from orders
- **Auth** — JWT-based authentication with two roles: `USER` and `ADMIN`

## User Roles

- **Anonymous / USER** — Can browse, add to cart, and check out without an account; account is optional
- **ADMIN** — Can manage products, view and update all orders, and manage service scheduling

## Business Rules

- Prices are stored and displayed in **Colombian Pesos (COP)** as `Long` (integer cents-equivalent)
- **IVA (19%)** is calculated at checkout and shown separately from subtotal
- Products have a soft-delete flag (`activo`) — deleted products are hidden from the catalog but not removed from the DB
- Services in an order automatically generate a `Scheduling` record with `PENDING` status
- Cart is identified by a `sessionId` stored in `localStorage` (no server-side session)
- Order statuses: `PENDING` → `PAID` → `CONFIRMED`
- Scheduling statuses: `PENDING` → `CONFIRMED` → `COMPLETED` / `CANCELLED`

## Language Note

Domain field names use Spanish (e.g., `nombre`, `descripcion`, `precioCOP`, `activo`, `categoria`). Keep this convention consistent — do not translate field names to English when working with existing entities.
