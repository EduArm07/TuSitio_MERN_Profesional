import { useState, useEffect } from "react";
import { getList, create, update, remove } from "../../../services/workdayService";

const ROLES = ["admin", "gerente", "empleado"];

export function Menu() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    path: "",
    icon: "",
    order: 0,
    active: true,
    roles: ["empleado"],
  });

  const load = async () => {
    setLoading(true);
    try {
      const data = await getList("menu");
      setMenus(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setMenus([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: "", path: "", icon: "", order: 0, active: true, roles: ["empleado"] });
    setModalOpen(true);
  };

  const openEdit = (m) => {
    setEditing(m);
    setForm({ title: m.title, path: m.path, icon: m.icon || "", order: m.order, active: m.active, roles: m.roles });
    setModalOpen(true);
  };

  const toggleRole = (rol) => {
    setForm((prev) => ({
      ...prev,
      roles: prev.roles.includes(rol) ? prev.roles.filter((r) => r !== rol) : [...prev.roles, rol],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await update("menu", editing._id, { ...form, order: Number(form.order) });
      else await create("menu", { ...form, order: Number(form.order) });
      setModalOpen(false);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleActive = async (m) => {
    try {
      await update("menu", m._id, { active: !m.active });
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este ítem del menú?")) return;
    try {
      await remove("menu", id);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="toolbar">
        <h2 style={{ margin: 0, color: "#0b2f6b" }}>Menú dinámico del panel</h2>
        <button className="btn-new" onClick={openCreate}>+ Nuevo ítem</button>
      </div>

      {loading && <p className="state-msg">Cargando menú...</p>}
      {!loading && menus.length === 0 && <p className="state-msg">No hay ítems de menú.</p>}
      {!loading && menus.length > 0 && (
        <table className="page-table">
          <thead>
            <tr><th>Orden</th><th>Ícono</th><th>Título</th><th>Path</th><th>Roles</th><th>Estado</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {menus.map((m) => (
              <tr key={m._id}>
                <td>{m.order}</td>
                <td>{m.icon || "—"}</td>
                <td>{m.title}</td>
                <td>{m.path}</td>
                <td>{m.roles?.join(", ")}</td>
                <td>
                  <span className={`status-badge ${m.active ? "status-badge--active" : "status-badge--inactive"}`}>
                    {m.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td>
                  <div className="row-actions">
                    <button onClick={() => openEdit(m)}>✏️</button>
                    <button onClick={() => toggleActive(m)}>{m.active ? "🚫" : "✅"}</button>
                    <button className="danger" onClick={() => handleDelete(m._id)}>🗑️</button>
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
            <h2>{editing ? "Editar ítem" : "Nuevo ítem de menú"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="modal-field"><label>Título</label><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div className="modal-field"><label>Path (ej: /admin/empleados)</label><input required value={form.path} onChange={(e) => setForm({ ...form, path: e.target.value })} /></div>
              <div className="modal-field"><label>Ícono (emoji)</label><input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} /></div>
              <div className="modal-field"><label>Orden</label><input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} /></div>
              <div className="modal-field">
                <label>Roles con acceso</label>
                <div style={{ display: "flex", gap: 12 }}>
                  {ROLES.map((rol) => (
                    <label key={rol} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem" }}>
                      <input type="checkbox" checked={form.roles.includes(rol)} onChange={() => toggleRole(rol)} /> {rol}
                    </label>
                  ))}
                </div>
              </div>
              <div className="modal-field">
                <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Activo
                </label>
              </div>
              <div className="modal-box__footer">
                <button type="button" className="secondary" onClick={() => setModalOpen(false)}>Cancelar</button>
                <button type="submit" className="primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}