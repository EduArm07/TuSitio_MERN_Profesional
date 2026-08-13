import { useState, useEffect } from "react";
import { getList, create, action } from "../../../services/workdayService";
import { Pagination } from "../../../components/Pagination";
import { usePermissions } from "../../../hooks/usePermissions";

export function Vacaciones() {
  const { hasRole } = usePermissions();
  const [vacaciones, setVacaciones] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ empleado_id: "", fecha_inicio: "", fecha_fin: "", dias: 1, motivo: "" });

  const load = async (page) => {
    setLoading(true);
    try {
      const params = { page, limit: 8 };
      if (filter !== "all") params.estado = filter;
      const data = await getList("vacaciones", params);
      setVacaciones(data.docs || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

    useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load(currentPage);
    getList("empleados", { limit: 100 })
      .then((d) => setEmpleados(d.docs || []))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await create("vacaciones", { ...form, dias: Number(form.dias) });
      setModalOpen(false);
      setForm({ empleado_id: "", fecha_inicio: "", fecha_fin: "", dias: 1, motivo: "" });
      load(currentPage);
    } catch (err) { alert(err.message); }
  };

  const resolver = async (id, accion) => {
    try {
      await action("vacaciones", id, accion, { comentario_gerente: accion === "aprobar" ? "Aprobado" : "Rechazado" });
      load(currentPage);
    } catch (err) { alert(err.message); }
  };

  return (
    <div>
      <div className="toolbar">
        <div className="toolbar__filters">
          {["all", "pendiente", "aprobado", "rechazado"].map((f) => (
            <button key={f} className={filter === f ? "active" : ""} onClick={() => { setFilter(f); setCurrentPage(1); }}>
              {f === "all" ? "Todas" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button className="btn-new" onClick={() => setModalOpen(true)}>+ Solicitar vacaciones</button>
      </div>

      {loading && <p className="state-msg">Cargando solicitudes...</p>}
      {!loading && vacaciones.length === 0 && <p className="state-msg">No hay solicitudes.</p>}
      {!loading && vacaciones.length > 0 && (
        <table className="page-table">
          <thead>
            <tr><th>Empleado</th><th>Inicio</th><th>Fin</th><th>Días</th><th>Motivo</th><th>Estado</th>{hasRole("gerente") && <th>Acciones</th>}</tr>
          </thead>
          <tbody>
            {vacaciones.map((v) => (
              <tr key={v._id}>
                <td>{v.empleado_id?.nombre || "—"}</td>
                <td>{new Date(v.fecha_inicio).toLocaleDateString("es-PE")}</td>
                <td>{new Date(v.fecha_fin).toLocaleDateString("es-PE")}</td>
                <td>{v.dias}</td>
                <td>{v.motivo}</td>
                <td><span className={`status-badge status-badge--${v.estado === "aprobado" ? "active" : v.estado === "rechazado" ? "inactive" : "pendiente"}`}>{v.estado}</span></td>
                {hasRole("gerente") && (
                  <td>
                    {v.estado === "pendiente" && (
                      <div className="row-actions">
                        <button onClick={() => resolver(v._id, "aprobar")}>✅</button>
                        <button className="danger" onClick={() => resolver(v._id, "rechazar")}>❌</button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={setCurrentPage} />

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>Solicitar vacaciones</h2>
            <form onSubmit={handleSubmit}>
              <div className="modal-field">
                <label>Empleado</label>
                <select required value={form.empleado_id} onChange={(e) => setForm({ ...form, empleado_id: e.target.value })}>
                  <option value="">Selecciona...</option>
                  {empleados.map((emp) => <option key={emp._id} value={emp._id}>{emp.nombre}</option>)}
                </select>
              </div>
              <div className="modal-field"><label>Fecha inicio</label><input type="date" required value={form.fecha_inicio} onChange={(e) => setForm({ ...form, fecha_inicio: e.target.value })} /></div>
              <div className="modal-field"><label>Fecha fin</label><input type="date" required value={form.fecha_fin} onChange={(e) => setForm({ ...form, fecha_fin: e.target.value })} /></div>
              <div className="modal-field"><label>Días</label><input type="number" min="1" required value={form.dias} onChange={(e) => setForm({ ...form, dias: e.target.value })} /></div>
              <div className="modal-field"><label>Motivo</label><textarea required value={form.motivo} onChange={(e) => setForm({ ...form, motivo: e.target.value })} /></div>
              <div className="modal-box__footer">
                <button type="button" className="secondary" onClick={() => setModalOpen(false)}>Cancelar</button>
                <button type="submit" className="primary">Enviar solicitud</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}