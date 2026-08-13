import { useState, useEffect } from "react";
import { getList, create, action } from "../../../services/workdayService";
import { Pagination } from "../../../components/Pagination";

export function Asistencias() {
  const [asistencias, setAsistencias] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [empleadoSel, setEmpleadoSel] = useState("");

  const load = async (page) => {
    setLoading(true);
    try {
      const data = await getList("asistencias", { page, limit: 8 });
      setAsistencias(data.docs || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

    useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load(currentPage);
    getList("empleados", { limit: 100, activo: "true" })
      .then((d) => setEmpleados(d.docs || []))
      .catch(() => {});
  }, [currentPage]);

  const registrarEntrada = async () => {
    if (!empleadoSel) return alert("Selecciona un empleado");
    try {
      await create("asistencias/entrada", { empleado_id: empleadoSel });
      load(currentPage);
    } catch (err) { alert(err.message); }
  };

  const registrarSalida = async (id) => {
    try {
      await action("asistencias", id, "salida");
      load(currentPage);
    } catch (err) { alert(err.message); }
  };

  return (
    <div>
      <div className="toolbar">
        <h2 style={{ margin: 0, color: "#0b2f6b" }}>Registro de asistencias</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <select value={empleadoSel} onChange={(e) => setEmpleadoSel(e.target.value)}
            style={{ padding: "10px 14px", borderRadius: 999, border: "1px solid #e2e8f0" }}>
            <option value="">Selecciona empleado...</option>
            {empleados.map((e) => <option key={e._id} value={e._id}>{e.nombre}</option>)}
          </select>
          <button className="btn-new" onClick={registrarEntrada}>🕐 Registrar entrada</button>
        </div>
      </div>

      {loading && <p className="state-msg">Cargando asistencias...</p>}
      {error && <p className="state-msg state-msg--error">{error}</p>}
      {!loading && !error && asistencias.length === 0 && <p className="state-msg">No hay asistencias registradas.</p>}
      {!loading && !error && asistencias.length > 0 && (
        <>
          <table className="page-table">
            <thead>
              <tr><th>Empleado</th><th>Fecha</th><th>Entrada</th><th>Salida</th><th>Horas</th><th>Tardanza</th><th></th></tr>
            </thead>
            <tbody>
              {asistencias.map((a) => (
                <tr key={a._id}>
                  <td>{a.empleado_id?.nombre || "—"}</td>
                  <td>{new Date(a.fecha).toLocaleDateString("es-PE")}</td>
                  <td>{a.hora_entrada}</td>
                  <td>{a.hora_salida || "—"}</td>
                  <td>{a.horas_trabajadas ? a.horas_trabajadas.toFixed(1) + " h" : "—"}</td>
                  <td><span className={`status-badge ${a.tardanza ? "status-badge--inactive" : "status-badge--active"}`}>{a.tardanza ? "Tardanza" : "Puntual"}</span></td>
                  <td>
                    {!a.hora_salida && (
                      <div className="row-actions"><button onClick={() => registrarSalida(a._id)}>Registrar salida</button></div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={setCurrentPage} />
        </>
      )}
    </div>
  );
}