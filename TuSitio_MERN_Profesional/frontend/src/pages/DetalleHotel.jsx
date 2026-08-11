import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function DetalleHotel() {
  return (
    <>
      <Navbar />

      <div className="detalle-container">

        <div className="hotel-banner">
          <img
            src="https://picsum.photos/1200/500?hotel"
            alt="Hotel"
          />
        </div>

        <div className="hotel-detalle">

          <h1>Hotel Sol Lima</h1>

          <p className="estrellas">
            ⭐⭐⭐⭐
          </p>

          <p className="ubicacion">
            Cercado de Lima, Perú
          </p>

          <h2>Descripción</h2>

          <p>
            Hotel moderno ubicado en el centro de Lima.
            Cuenta con habitaciones cómodas, wifi gratuito,
            restaurante, estacionamiento y servicio de recepción 24 horas.
          </p>

          <h2>Servicios</h2>

          <ul className="servicios">
            <li>✅ Wifi Gratuito</li>
            <li>✅ Piscina</li>
            <li>✅ Restaurante</li>
            <li>✅ Estacionamiento</li>
            <li>✅ Recepción 24 horas</li>
          </ul>

          <h2>Habitaciones Disponibles</h2>

          <div className="habitaciones-grid">

            <div className="habitacion-card">

              <h3>Habitación Individual</h3>

              <p>Capacidad: 1 persona</p>

              <p className="precio">
                S/. 250 por noche
              </p>

              <Link to="/reserva">
                <button>
                  Reservar
                </button>
              </Link>

            </div>

            <div className="habitacion-card">

              <h3>Habitación Doble</h3>

              <p>Capacidad: 2 personas</p>

              <p className="precio">
                S/. 350 por noche
              </p>

              <Link to="/reserva">
                <button>
                  Reservar
                </button>
              </Link>

            </div>

            <div className="habitacion-card">

              <h3>Suite Familiar</h3>

              <p>Capacidad: 4 personas</p>

              <p className="precio">
                S/. 550 por noche
              </p>

             <Link to="/reserva">
              <button>
                Reservar
              </button>
            </Link>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default DetalleHotel;