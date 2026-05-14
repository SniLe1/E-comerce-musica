# AGENTS.md — Tienda de Música E-commerce

## Project Overview
- Django 5.2 + PostgreSQL backend, React 19 frontend (Create React App)
- Decoupled architecture: Django serves REST API on port 8000, React dev server on port 3000
- Spanish-language project; comments and docs are in Spanish

## Directory Structure
```
tienda_musica/                 ← Django project root
├── manage.py
├── tienda_musica/             ← Django settings/urls (settings.py, urls.py)
├── tienda_app/                ← Products (models, serializers, views, urls)
├── users/                     ← Auth, registration, JWT customization
├── cart/                      ← Shopping cart (Cart, CartItem models + ViewSet)
├── orders/                    ← Order models (stub — no serializers/urls yet)
├── HomeConfig/                ← Admin-managed home page config + carousel images
├── contacto/                  ← Contact form messages + email sending
├── media/                     ← Uploaded product images (gitignored)
└── frontend/                  ← React app (CRA)
    └── src/
        ├── App.js             ← All routes + PrivateAdminRoute guard
        ├── axiosConfig.js     ← Axios instance with JWT interceptor + auto-refresh
        ├── components/        ← Navbar, CartSidebar, CartContext, Toast, etc.
        ├── pages/             ← Page components (HomePage, Products, etc.)
        └── admin/             ← Admin-only page components (AdminPage, AdminHomePage, AdminContact, AdminProductsPage)
```

## Developer Commands

### Backend (run from `tienda_musica/`)
```bash
python manage.py runserver          # Start Django dev server on :8000
python manage.py makemigrations     # Create migrations after model changes
python manage.py migrate            # Apply migrations
python manage.py createsuperuser    # Create admin user
```

### Frontend (run from `tienda_musica/frontend/`)
```bash
corepack pnpm start                           # Start React dev server on :3000
corepack pnpm test                            # Run Jest tests (watch mode)
corepack pnpm run build                       # Production build
```

### node_modules reset (when corrupted)
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item pnpm-lock.yaml
corepack pnpm install
corepack pnpm start
```

## Setup Prerequisites
- PostgreSQL must be running; DB name: `tienda_musica`, user: `postgres`, password: `1251` (see `settings.py:89-98`)
- Create the database before first `migrate`
- Both servers must run simultaneously (backend :8000, frontend :3000)
- `CORS_ALLOW_ALL_ORIGINS = True` in settings (dev only)
- Python deps: django, djangorestframework, djangorestframework-simplejwt, psycopg2-binary, Pillow, django-cors-headers

## Architecture Notes
- **URL namespace**: all API routes are under `/api/tienda/`, `/api/users/`, `/api/cart/`, `/api/home/`, `/api/contacto/`
- **Auth**: JWT via simplejwt. Login stores `accessToken`, `refreshToken`, and `isAdmin` in localStorage
- **Admin guard**: `PrivateAdminRoute` in `App.js` checks `localStorage.getItem("isAdmin") === "true"` — client-side only, not a security boundary
- **Cart**: Backend-managed (DB-persisted). `CartContext.js` is the single source of truth; calls go through `axiosConfig.js` which attaches JWT automatically
- **Media files**: product images served from `/media/`. The serializer must use `ImageField(use_url=True)` and pass `context={'request': request}` for full URLs
- **Slugs**: auto-generated from `titulo` in `Producto.save()`; also regenerated on update in `ProductoSerializer.update()` via `slugify()`
- **Contact form**: saves to DB + sends email via Gmail SMTP (credentials hardcoded in `settings.py:163-164` — DO NOT commit to production)
- **AdminHomePage layout**: Hero + Carrusel en grid 2 columnas, Features abajo a ancho completo. Ubicado en `admin/AdminHomePage.js`

## Testing & Verification
- No CI configured. Manual testing only.
- Frontend tests use Jest via `react-scripts test` (few/no actual tests exist)
- Django apps have empty `tests.py` files

## Known Quirks
- No `requirements.txt` exists — install Python deps manually as listed in README
- Email password is hardcoded in `settings.py` (security risk)
- Database credentials are hardcoded in `settings.py`
- Admin route protection is client-side only (`localStorage`) — not secure
- `orders` app has models but no serializers, views, or URLs wired up yet
- When editing products, always use `PATCH` method (not `POST`)
- React fetch responses may be paginated — handle `data.results` fallback
