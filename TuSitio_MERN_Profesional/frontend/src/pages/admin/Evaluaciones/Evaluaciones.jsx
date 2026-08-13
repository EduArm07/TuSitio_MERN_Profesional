import { useState, useEffect } from "react";
import { getList, create } from "../../../services/workdayService";
import { Pagination } from "../../../components/Pagination";

const CRITERIOS = ["Puntualidad", "Calidad de trabajo", "Trabajo en equipo"];

export function Evaluaciones() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    empleado_id: "", periodo: "",
    criterios: CRITERIOS.map((nombre) => ({ nombre, puntuacion: 3 })),
    comentario: "",
  });

  const load = async (page) => {
    setLoading(true);
    try {
      const data = await getList("evaluaciones", { page, limit: 8 });
      setEvaluaciones(data.docs || []);
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
  }, [currentPage]);
  const setPuntaje = (i, val) => {
    const criterios = form.criterios.map((c, idx) => (idx === i ? { ...c, puntuacion: Number(val) } : c));
    setForm({ ...form, criterios });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await create("evaluaciones", form);
      setModalOpen(false);
      load(currentPage);
    } catch (err) { alert(err.message); }
  };

  return (
    <div>
      <div className="toolbar">
        <h2 style={{ margin: 0, color: "#0b2f6b" }}>Evaluaciones de desempeño</h2>
        <button className="btn-new" onClick={() => setModalOpen(true)}>+ Nueva evaluación</button>
      </div>

      {loading && <p className="state-msg">Cargando evaluaciones...</p>}
      {!loading && evaluaciones.length === 0 && <p className="state-msg">No hay evaluaciones.</p>}
      {!loading && evaluaciones.length > 0 && (
        <table className="page-table">
          <thead><tr><th>Empleado</th><th>Periodo</th><th>Promedio</th><th>Comentario</th></tr></thead>
          <tbody>
            {evaluaciones.map((ev) => (
              <tr key={ev._id}>
                <td>{ev.empleado_id?.nombre || "—"}</td>
                <td>{ev.periodo}</td>
                <td><span className="status-badge status-badge--active">{ev.promedio?.toFixed(1)} / 5</span></td>
                <td>{ev.comentario || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={setCurrentPage} />

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>Nueva evaluación</h2>
            <form onSubmit={handleSubmit}>
              <div className="modal-field">
                <label>Empleado</label>
                <select required value={form.empleado_id} onChange={(e) => setForm({ ...form, empleado_id: e.target.value })}>
                  <option value="">Selecciona...</option>
                  {empleados.map((emp) => <option key={emp._id} value={emp._id}>{emp.nombre}</option>)}
                </select>
              </div>
              <div className="modal-field"><label>Periodo (ej: 2026-1)</label><input required value={form.periodo} onChange={(e) => setForm({ ...form, periodo: e.target.value })} /></div>
              {form.criterios.map((c, i) => (
                <div className="modal-field" key={c.nombre}>
                  <label>{c.nombre} (0-5)</label>
                  <input type="number" min="0" max="5" value={c.puntuacion} onChange={(e) => setPuntaje(i, e.target.value)} />
                </div>
              ))}
              <div className="modal-field"><label>Comentario</label><textarea value={form.comentario} onChange={(e) => setForm({ ...form, comentario: e.target.value })} /></div>
              <div className="modal-box__footer">
                <button type="button" className="secondary" onClick={() => setModalOpen(false)}>Cancelar</button>
                <button type="submit" className="primary">Guardar evaluación</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}