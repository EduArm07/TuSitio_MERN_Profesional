import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Hoteles() {
  return (
    <>
      <Navbar />

      <div className="hoteles-container">

        <h1>Buscar alojamiento</h1>

        <p>
          Explora los hoteles disponibles y encuentra la mejor opción para tu viaje.
        </p>

        <div className="hotel-list">

          <div className="hotel-card">

            <img
              src="https://picsum.photos/350/220?10"
              alt="Hotel Sol Lima"
            />

            <div className="hotel-info">

              <h2>Hotel Sol Lima</h2>

              <p>⭐⭐⭐⭐</p>

              <p>Cercado de Lima</p>

              <p className="precio">
                S/. 250 por noche
              </p>

              <Link to="/detalle-hotel">
                <button>Ver Detalle</button>
              </Link>

            </div>

          </div>

          <div className="hotel-card">

            <img
              src="https://picsum.photos/350/220?20"
              alt="Hotel Inka Cusco"
            />

            <div className="hotel-info">

              <h2>Hotel Inka Cusco</h2>

              <p>⭐⭐⭐⭐⭐</p>

              <p>Centro Histórico</p>

              <p className="precio">
                S/. 320 por noche
              </p>

              <Link to="/detalle-hotel">
                <button>Ver Detalle</button>
              </Link>

            </div>

          </div>

          <div className="hotel-card">

            <img
              src="https://picsum.photos/350/220?30"
              alt="Hotel Mar Paracas"
            />

            <div className="hotel-info">

              <h2>Hotel Mar Paracas</h2>

              <p>⭐⭐⭐⭐</p>

              <p>Paracas</p>

              <p className="precio">
                S/. 280 por noche
              </p>

              <Link to="/detalle-hotel">
                <button>Ver Detalle</button>
              </Link>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Hoteles;