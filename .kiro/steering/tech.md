# Tech Stack

## Backend

- **Runtime**: Java 17
- **Framework**: Spring Boot 3.4.4
- **Build tool**: Maven (use `./mvnw` wrapper)
- **Security**: Spring Security + JWT (`jjwt 0.12.6`), stateless sessions, BCrypt passwords
- **Persistence**: Spring Data JPA / Hibernate with H2 file-based database (`./data/gassolutions.mv.db`)
- **Validation**: `spring-boot-starter-validation` (`@Valid`, `@NotBlank`, `@Positive`, etc.)
- **Utilities**: Lombok (available but used minimally — entities use manual getters/setters)
- **Database console**: H2 web console available at `http://localhost:8080/h2-console`

## Frontend

- **Runtime**: Node.js (ESM)
- **Framework**: React 19 with TypeScript 6
- **Build tool**: Vite 8
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin — no `tailwind.config.js` needed)
- **HTTP client**: Axios (centralized in `src/services/api.ts`)
- **Linter**: oxlint

## API

- Backend runs on `http://localhost:8080`
- Frontend dev server on `http://localhost:5173`
- Vite proxies `/api/*` → `http://localhost:8080` in development
- All API routes are prefixed with `/api/`
- Admin routes are under `/api/admin/` and require `ROLE_ADMIN`
- JWT token sent as `Authorization: Bearer <token>` header

## Common Commands

### Backend (run from `backend/`)
```
# Start dev server
./mvnw spring-boot:run

# Build JAR
./mvnw clean package

# Run tests
./mvnw test
```
> On Windows use `mvnw.cmd` instead of `./mvnw`

### Frontend (run from `frontend/`)
```
# Start dev server
npm run dev

# Type-check and build for production
npm run build

# Lint
npm run lint

# Preview production build
npm run preview
```

## Environment / Config

- Backend config: `backend/src/main/resources/application.yml`
- JWT secret and expiration are set in `application.yml` under `app.jwt`
- CORS allowed origins: `http://localhost:5173`, `http://localhost:3000`
- No `.env` files — all config is in `application.yml` for the backend and Vite proxy for the frontend
