# Project Structure

```
ecommerce-gas/
├── backend/                         # Spring Boot application
│   ├── src/main/java/com/gassolutions/
│   │   ├── GasSolutionsApplication.java   # Entry point
│   │   ├── auth/                    # Login, register, JWT token endpoints
│   │   ├── cart/                    # Session-based cart logic
│   │   ├── common/                  # Shared enums (Role, OrderStatus, SchedulingStatus, ItemType, ProductCategory)
│   │   ├── config/                  # SecurityConfig, JwtService, JwtAuthenticationFilter, GlobalExceptionHandler, DataInitializer
│   │   ├── order/                   # Order entity, checkout flow, admin order management
│   │   ├── product/                 # Product entity, CRUD, DTO
│   │   ├── scheduling/              # Service appointment scheduling, admin controller
│   │   ├── service/                 # Gas installation/repair services (entity, DTO, controller)
│   │   └── user/                    # User entity and repository
│   ├── src/main/resources/
│   │   └── application.yml          # All app config (DB, JWT, CORS, server port)
│   └── data/
│       └── gassolutions.mv.db       # H2 file database (do not commit)
│
└── frontend/                        # React + Vite application
    ├── src/
    │   ├── App.tsx                  # Root component, route definitions
    │   ├── main.tsx                 # React entry point
    │   ├── components/              # Shared UI components (Navbar, Footer, ProductCard)
    │   ├── context/                 # React Context providers (AuthContext, CartContext)
    │   ├── pages/                   # Route-level page components
    │   │   ├── admin/               # Admin pages (Orders, Products, Scheduling, AdminLayout)
    │   │   └── *.tsx                # Customer-facing pages
    │   ├── services/
    │   │   └── api.ts               # All API calls via Axios; one exported service object per domain
    │   └── types/
    │       └── index.ts             # All shared TypeScript types/interfaces
    ├── vite.config.ts               # Vite config with React plugin, Tailwind plugin, and /api proxy
    └── package.json
```

## Backend Conventions

- **Package-by-feature**: each domain (`product`, `order`, `cart`, etc.) is a self-contained package with its own entity, DTO, repository, service (if any), and controller
- **DTO pattern**: entities are never returned directly from controllers; use a DTO with static `fromEntity()` and `toEntity()` methods
- **No Lombok on entities**: entities use plain manual getters/setters; Lombok is available but not currently used
- **Constructor injection**: all Spring beans use constructor injection, not `@Autowired` field injection
- **`@PreAuthorize`** on admin-only controller methods; global route rules in `SecurityConfig`
- **Soft delete**: use `activo = false` instead of deleting records (products, services)
- **Shared enums** go in the `common` package

## Frontend Conventions

- **All API calls** go through `src/services/api.ts` — never call `axios` directly from components or pages
- **Global state** uses React Context (`AuthContext`, `CartContext`); no Redux or Zustand
- **Types** are centralized in `src/types/index.ts`
- **Routing** is defined in `App.tsx` using React Router v7 `<Routes>` / `<Route>`
- **Styling** uses Tailwind utility classes directly in JSX — no CSS modules or separate stylesheets beyond `index.css`
- **Admin section** lives under `/admin/*` routes and is wrapped in `AdminLayout`
- `sessionId` for the cart is generated client-side with `crypto.randomUUID()` and persisted in `localStorage`
- JWT token is stored in `localStorage` and automatically attached via an Axios request interceptor
