import { useState, useEffect } from "react";
import { getList, create, update, remove } from "../../../services/workdayService";

export function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ nombre: "", dni: "", correo: "", password: "", rol: "empleado" });

  const load = async () => {
    setLoading(true);
    try {
      const data = await getList("usuarios");
      setUsuarios(data.response || data.docs || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

    useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await create("usuarios", form);
      setModalOpen(false);
      setForm({ nombre: "", dni: "", correo: "", password: "", rol: "empleado" });
      load();
    } catch (err) { alert(err.message); }
  };

  const toggleActivo = async (u) => {
    try {
      await update("usuarios", u._id, { activo: !u.activo });
      load();
    } catch (err) { alert(err.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este usuario?")) return;
    try { await remove("usuarios", id); load(); }
    catch (err) { alert(err.message); }
  };

  return (
    <div>
      <div className="toolbar">
        <h2 style={{ margin: 0, color: "#0b2f6b" }}>Usuarios del sistema</h2>
        <button className="btn-new" onClick={() => setModalOpen(true)}>+ Nuevo usuario</button>
      </div>

      {loading && <p className="state-msg">Cargando usuarios...</p>}
      {!loading && (
        <table className="page-table">
          <thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u._id}>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td><span className={`user-welcome__role user-welcome__role--${u.rol}`} style={{ marginLeft: 0 }}>{u.rol}</span></td>
                <td><span className={`status-badge ${u.activo ? "status-badge--active" : "status-badge--inactive"}`}>{u.activo ? "Activo" : "Inactivo"}</span></td>
                <td>
                  <div className="row-actions">
                    <button onClick={() => toggleActivo(u)}>{u.activo ? "Desactivar" : "Activar"}</button>
                    <button className="danger" onClick={() => handleDelete(u._id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>Nuevo usuario</h2>
            <form onSubmit={handleSubmit}>
              <div className="modal-field"><label>Nombre</label><input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} /></div>
              <div className="modal-field"><label>DNI</label><input required value={form.dni} onChange={(e) => setForm({ ...form, dni: e.target.value })} /></div>
              <div className="modal-field"><label>Correo</label><input type="email" required value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} /></div>
              <div className="modal-field"><label>Contraseña</label><input type="password" minLength={6} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
              <div className="modal-field">
                <label>Rol</label>
                <select value={form.rol} onChange={(e) => setForm({ ...form, rol: e.target.value })}>
                  <option value="empleado">empleado</option>
                  <option value="gerente">gerente</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <div className="modal-box__footer">
                <button type="button" className="secondary" onClick={() => setModalOpen(false)}>Cancelar</button>
                <button type="submit" className="primary">Crear usuario</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}