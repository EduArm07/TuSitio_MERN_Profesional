import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Icon } from "../../../assets";

export function Auth() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    correo: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const isRegister = mode === "register";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const switchMode = (newMode) => {
    if (newMode === mode) return;
    setMode(newMode);
    setErrors({});
    setServerMessage(null);
  };

  const validate = () => {
    const newErrors = {};
    if (isRegister && !formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (isRegister && !formData.dni.trim()) newErrors.dni = "El DNI es obligatorio";
    if (!formData.correo.trim()) newErrors.correo = "El correo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) newErrors.correo = "Correo inválido";
    if (!formData.password) newErrors.password = "La contraseña es obligatoria";
    else if (formData.password.length < 6) newErrors.password = "Mínimo 6 caracteres";
    if (isRegister && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage(null);
    if (!validate()) return;
    setLoading(true);
    try {
      if (isRegister) {
        await register({
          nombre: formData.nombre,
          dni: formData.dni,
          correo: formData.correo,
          password: formData.password,
        });
        setServerMessage({
          type: "success",
          text: "Cuenta creada correctamente. Ya puedes iniciar sesión.",
        });
        setFormData({ nombre: "", dni: "", correo: "", password: "", confirmPassword: "" });
        setTimeout(() => switchMode("login"), 2500);
      } else {
        const data = await login(formData.correo, formData.password);
        setServerMessage({ type: "success", text: "Inicio de sesión correcto." });
        navigate(data.user?.rol === "empleado" ? "/admin/asistencias" : "/admin/empleados");
      }
    } catch (err) {
      setServerMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Panel de marca */}
      <div className="auth-panel auth-panel--brand">
        <div className="auth-panel__content">
          <img src={Icon.workdayLogo} alt="Workday" className="auth-logo" />
          <h1>Workday</h1>
          <p>Gestiona empleados, asistencias, vacaciones y evaluaciones desde un solo lugar.</p>
        </div>
      </div>

      {/* Panel de formulario */}
      <div className="auth-panel auth-panel--form">
        <div className="auth-box">
          <div className="auth-tabs">
            <button
              type="button"
              className={!isRegister ? "active" : ""}
              onClick={() => switchMode("login")}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              className={isRegister ? "active" : ""}
              onClick={() => switchMode("register")}
            >
              Registrarse
            </button>
            <span
              className="auth-tabs__indicator"
              style={{ transform: isRegister ? "translateX(100%)" : "translateX(0)" }}
            />
          </div>
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {isRegister && (
              <div className="auth-field">
                <label>Nombre completo</label>
                <input
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={errors.nombre ? "input-error" : ""}
                  placeholder="Tu nombre"
                />
                {errors.nombre && <span className="field-error">{errors.nombre}</span>}
              </div>
            )}
            {isRegister && (
              <div className="auth-field">
                <label>DNI</label>
                <input
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  className={errors.dni ? "input-error" : ""}
                  placeholder="12345678"
                />
                {errors.dni && <span className="field-error">{errors.dni}</span>}
              </div>
            )}
            <div className="auth-field">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className={errors.correo ? "input-error" : ""}
                placeholder="tucorreo@ejemplo.com"
              />
              {errors.correo && <span className="field-error">{errors.correo}</span>}
            </div>
            <div className="auth-field">
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
                placeholder="••••••••"
              />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>
            {isRegister && (
              <div className="auth-field">
                <label>Confirmar contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "input-error" : ""}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
              </div>
            )}
            {serverMessage && (
              <p className={`auth-form__message ${serverMessage.type}`}>{serverMessage.text}</p>
            )}
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Procesando..." : isRegister ? "Crear cuenta" : "Iniciar sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}