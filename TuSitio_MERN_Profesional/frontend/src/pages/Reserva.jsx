import Navbar from "../components/Navbar";

function Reserva() {
  return (
    <>
      <Navbar />

      <div className="reserva-container">

        <div className="reserva-card">

          <h1>Confirmar Reserva</h1>

          <div className="resumen-hotel">

            <h2>Hotel Sol Lima</h2>

            <p>⭐⭐⭐⭐</p>

            <p>Cercado de Lima, Perú</p>

          </div>

          <form className="form-reserva">

            <label>Fecha de Entrada</label>
            <input type="date" />

            <label>Fecha de Salida</label>
            <input type="date" />

            <label>Huéspedes</label>
            <select>
              <option>1 Huésped</option>
              <option>2 Huéspedes</option>
              <option>3 Huéspedes</option>
              <option>4 Huéspedes</option>
            </select>

            <label>Habitación</label>
            <select>
              <option>Habitación Individual</option>
              <option>Habitación Doble</option>
              <option>Suite Familiar</option>
            </select>

            <div className="precio-total">

              <h3>Total Estimado</h3>

              <p>S/. 750</p>

            </div>

            <button type="submit">
              Confirmar Reserva
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default Reserva;