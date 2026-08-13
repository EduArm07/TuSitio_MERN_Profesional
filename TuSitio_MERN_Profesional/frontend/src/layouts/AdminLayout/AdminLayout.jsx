import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { usePermissions } from "../../hooks/usePermissions";
import { Icon } from "../../assets";

const navItems = [
  { to: "/admin/usuarios", label: "Usuarios", icon: "👥", requiredRole: "admin" },
  { to: "/admin/empleados", label: "Empleados", icon: "💼", requiredRole: "gerente" },
  { to: "/admin/asistencias", label: "Asistencias", icon: "🕐", requiredRole: "empleado" },
  { to: "/admin/vacaciones", label: "Vacaciones", icon: "🌴", requiredRole: "empleado" },
  { to: "/admin/evaluaciones", label: "Evaluaciones", icon: "📊", requiredRole: "gerente" },
  { to: "/admin/menu", label: "Menú", icon: "📋", requiredRole: "admin" },
];

function UserWelcome() {
  const { user } = useAuth();
  const { role } = usePermissions();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!user) return null;

  return (
    <div className="user-welcome">
      <div className="user-welcome__avatar">
        {user.correo ? user.correo.charAt(0).toUpperCase() : "U"}
      </div>
      <p className="user-welcome__greeting">
        Bienvenido, <strong>{user.correo}</strong>
        <span className={`user-welcome__role user-welcome__role--${role}`}>{role}</span>
        <span className="user-welcome__clock">{now.toLocaleTimeString("es-PE")}</span>
      </p>
    </div>
  );
}

function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="logout-button"
      onClick={() => {
        logout();
        navigate("/admin", { replace: true });
      }}
    >
      ⎋ Cerrar sesión
    </button>
  );
}

export function AdminLayout() {
  const { hasRole } = usePermissions();
  const visibleItems = navItems.filter((item) => hasRole(item.requiredRole));

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <img src={Icon.workdayLogo} alt="Workday" />
          <span>Workday</span>
        </div>
        <nav className="admin-sidebar__nav">
          {visibleItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "admin-nav-link admin-nav-link--active" : "admin-nav-link"
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          <LogoutButton />
        </div>
      </aside>
      <div className="admin-content">
        <header className="admin-header">
          <h1>Panel Workday</h1>
          <UserWelcome />
        </header>
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}