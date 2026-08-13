# 💼 Workday — Backend (API REST)

Sistema de gestión de empleados: asistencias, vacaciones y evaluaciones de desempeño.
Proyecto académico MERN (MongoDB, Express, React, Node.js).

## 🛠️ Stack tecnológico

- **Node.js + Express** (ES Modules)
- **MongoDB Atlas + Mongoose** con `mongoose-paginate-v2`
- **JWT doble token**: Access Token (3 h) + Refresh Token (1 mes)
- **bcryptjs** para encriptación de contraseñas
- **Roles jerárquicos**: `admin` > `gerente` > `empleado`

## 🚀 Instalación local

1. `npm install`
2. Crea tu `.env` siguiendo `.env.example`
3. `npm run dev` → API en `http://localhost:4000`

## 🔐 Autenticación

| Método | Endpoint | Acceso |
|---|---|---|
| POST | `/api/auth/registro` | Público |
| POST | `/api/auth/login` | Público (devuelve access + refresh) |
| POST | `/api/auth/refresh` | Público (renueva access token) |
| GET | `/api/auth/perfil` | Autenticado |

## 📦 Endpoints principales

| Módulo | Endpoints | Acceso |
|---|---|---|
| Usuarios | `GET /me` · `GET/POST/PUT/DELETE /api/usuarios` | admin |
| Empleados | CRUD `/api/empleados` (paginado, búsqueda y filtros) | lectura: auth · escritura: gerente+ |
| Asistencias | `POST /entrada` · `PUT /:id/salida` · `GET /` | auth |
| Vacaciones | `POST/GET` · `PUT /:id/aprobar` · `PUT /:id/rechazar` | solicitud: auth · aprobar: gerente+ |
| Evaluaciones | `POST/GET` con criterios y promedio automático | gerente+ |
| Menú dinámico | `GET` (público) · `POST/PUT/DELETE` | admin |

## 🗂️ Estructura

config/ · controllers/ · middleware/ · models/ · routes/ · utils/ · scripts/ (seed de datos)