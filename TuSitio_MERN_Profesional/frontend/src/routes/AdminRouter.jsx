import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "../layouts";
import { Auth, Usuarios, Empleados, Asistencias, Vacaciones, Evaluaciones, Menu } from "../pages/admin";
import { useAuth } from "../hooks/useAuth";
import { RequireRole } from "./RequireRole";

export function AdminRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route
        path="/"
        element={isAuthenticated ? <AdminLayout /> : <Navigate to="/admin" replace />}
      >
        <Route path="usuarios" element={<RequireRole role="admin"><Usuarios /></RequireRole>} />
        <Route path="empleados" element={<RequireRole role="gerente"><Empleados /></RequireRole>} />
        <Route path="asistencias" element={<RequireRole role="empleado"><Asistencias /></RequireRole>} />
        <Route path="vacaciones" element={<RequireRole role="empleado"><Vacaciones /></RequireRole>} />
        <Route path="evaluaciones" element={<RequireRole role="gerente"><Evaluaciones /></RequireRole>} />
        <Route path="menu" element={<RequireRole role="admin"><Menu /></RequireRole>} />
      </Route>
    </Routes>
  );
}