# 💼 Workday — Frontend

SPA en **React + Vite** para el sistema de gestión de empleados.

## 🛠️ Stack

React 19 · React Router DOM 7 · SCSS · Formik + Yup · jwt-decode · Context API + Hooks

## 🚀 Instalación

1. `npm install`
2. Crea `.env` con: `VITE_API_URL=http://localhost:4000/api`
3. `npm run dev` → `http://localhost:5173` (panel en `/admin`)

## 🏗️ Arquitectura (patrón del curso)

- `context/` + `hooks/` → sesión con recuperación automática por Refresh Token
- `routes/` → AdminRouter y WebRouter con `RequireRole`
- `layouts/` → AdminLayout (sidebar por permisos) y ClientLayout
- `pages/admin/` → Usuarios, Empleados, Asistencias, Vacaciones, Evaluaciones, Menú
- `services/` → ApiClient centralizado con Bearer token
- `assets/` → central de imágenes/logo (`index.js`)
- `scss/` → variables globales de color