import { useAuth } from "./useAuth";

const ROLE_HIERARCHY = { admin: 3, gerente: 2, empleado: 1 };

export function usePermissions() {
  const { user } = useAuth();
  const role = user?.rol || "empleado";

  const hasRole = (requiredRole) =>
    (ROLE_HIERARCHY[role] || 0) >= (ROLE_HIERARCHY[requiredRole] || 0);

  const isRole = (roleToCheck) => role === roleToCheck;

  return { role, hasRole, isRole };
}