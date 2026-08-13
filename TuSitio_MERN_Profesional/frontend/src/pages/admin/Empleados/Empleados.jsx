import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getList, create, update, remove } from "../../../services/workdayService";
import { Pagination } from "../../../components/Pagination";
import { usePermissions } from "../../../hooks/usePermissions";

const ITEMS_PER_PAGE = 6;

const validationSchema = Yup.object({
  nombre: Yup.string().required("Requerido"),
  dni: Yup.string().required("Requerido"),
  correo: Yup.string().email("Correo inválido").required("Requerido"),
  cargo: Yup.string().required("Requerido"),
  departamento: Yup.string().required("Requerido"),
  salario: Yup.number().min(0, "Inválido").required("Requerido"),
});

function EmpleadoFormModal({ empleado, onClose, onSaved }) {
  const isEdit = !!empleado;
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      nombre: empleado?.nombre || "",
      dni: empleado?.dni || "",
      correo: empleado?.correo || "",
      cargo: empleado?.cargo || "",
      departamento: empleado?.departamento || "",
      salario: empleado?.salario ?? "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setServerError(null);
      try {
        if (isEdit) await update("empleados", empleado._id, values);
        else await create("empleados", values);
        onSaved();
      } catch (err) {
        setServerError(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>{isEdit ? "Editar empleado" : "Nuevo empleado"}</h2>
        <form onSubmit={formik.handleSubmit}>
          {["nombre", "dni", "correo", "cargo", "departamento", "salario"].map((field) => (
            <div className="modal-field" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                name={field}
                type={field === "salario" ? "number" : field === "correo" ? "email" : "text"}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched[field] && formik.errors[field] ? "input-error" : ""}
              />
              {formik.touched[field] && formik.errors[field] && (
                <span className="field-error">{formik.errors[field]}</span>
              )}
            </div>
          ))}
          {serverError && <p className="state-msg state-msg--error">{serverError}</p>}
          <div className="modal-box__footer">
            <button type="button" className="secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="primary" disabled={loading}>
              {loading ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear empleado"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Empleados() {
  const { hasRole } = usePermissions();
  const [empleados, setEmpleados] = useState([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const activeValue = filter === "active" ? "true" : filter === "inactive" ? "false" : undefined;

  const load = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, limit: ITEMS_PER_PAGE };
      if (activeValue !== undefined) params.activo = activeValue;
      if (search) params.search = search;
      const data = await getList("empleados", params);
      setEmpleados(data.docs || []);
      setTotalPages(data.totalPages || 1);
      setTotalDocs(data.totalDocs || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filter]);

  const changeFilter = (f) => { setFilter(f); setCurrentPage(1); };
  const handleSaved = () => { setModalOpen(false); load(currentPage); };
  const handleDelete = async (id) => {
    try {
      await remove("empleados", id);
      setConfirmDeleteId(null);
      load(currentPage);
    } catch (err) { alert(err.message); }
  };

  return (
    <div>
      <div className="toolbar">
        <div className="toolbar__filters">
          <button className={filter === "all" ? "active" : ""} onClick={() => changeFilter("all")}>Todos</button>
          <button className={filter === "active" ? "active" : ""} onClick={() => changeFilter("active")}>Activos</button>
          <button className={filter === "inactive" ? "active" : ""} onClick={() => changeFilter("inactive")}>Inactivos</button>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <input className="toolbar__search" placeholder="Buscar empleado..." value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); load(1); }} />
          {hasRole("gerente") && (
            <button className="btn-new" onClick={() => { setEditing(null); setModalOpen(true); }}>+ Nuevo empleado</button>
          )}
        </div>
      </div>

      {loading && <p className="state-msg">Cargando empleados...</p>}
      {error && <p className="state-msg state-msg--error">{error}</p>}
      {!loading && !error && empleados.length === 0 && <p className="state-msg">No se encontraron empleados.</p>}
      {!loading && !error && empleados.length > 0 && (
        <>
          <p>{totalDocs} empleado{totalDocs !== 1 ? "s" : ""} en total</p>
          <table className="page-table">
            <thead>
              <tr><th>Nombre</th><th>DNI</th><th>Cargo</th><th>Departamento</th><th>Salario</th><th>Estado</th>{hasRole("gerente") && <th>Acciones</th>}</tr>
            </thead>
            <tbody>
              {empleados.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.nombre}</td>
                  <td>{emp.dni}</td>
                  <td>{emp.cargo}</td>
                  <td>{emp.departamento}</td>
                  <td>S/ {emp.salario}</td>
                  <td><span className={`status-badge ${emp.activo ? "status-badge--active" : "status-badge--inactive"}`}>{emp.activo ? "Activo" : "Inactivo"}</span></td>
                  {hasRole("gerente") && (
                    <td>
                      <div className="row-actions">
                        <button onClick={() => { setEditing(emp); setModalOpen(true); }}>✏️</button>
                        <button className="danger" onClick={() => setConfirmDeleteId(emp._id)}>🗑️</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={setCurrentPage} />
        </>
      )}

      {modalOpen && (
        <EmpleadoFormModal empleado={editing} onClose={() => setModalOpen(false)} onSaved={handleSaved} />
      )}
      {confirmDeleteId && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>¿Eliminar este empleado? Esta acción no se puede deshacer.</p>
            <div className="modal-box__footer">
              <button className="secondary" onClick={() => setConfirmDeleteId(null)}>Cancelar</button>
              <button className="primary" onClick={() => handleDelete(confirmDeleteId)}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}