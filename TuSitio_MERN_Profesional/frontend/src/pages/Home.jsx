import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />

      <div className="hero">

        <h1>Encuentra tu alojamiento ideal</h1>

        <p>
          Reserva hoteles, habitaciones y hospedajes
          de forma rápida y segura.
        </p>

        <div className="buscador">

          <input
            type="text"
            placeholder="¿A dónde quieres ir?"
          />

          <input type="date" />

          <input type="date" />

          <button>
            Buscar
          </button>

        </div>

      </div>



<section className="destacados">

  <h2>Hoteles Destacados</h2>

  <div className="cards">

    <div className="card">
      <img
        src="https://picsum.photos/300/200?1"
        alt="Hotel Sol Lima"
      />
      <h3>Hotel Sol Lima</h3>
      <p>⭐⭐⭐⭐</p>
      <p>S/. 250 por noche</p>
     <Link to="/detalle-hotel">
        <button>Ver Detalle</button>
      </Link>
    </div>

    <div className="card">
      <img
        src="https://picsum.photos/300/200?2"
        alt="Hotel Inka Cusco"
      />
      <h3>Hotel Inka Cusco</h3>
      <p>⭐⭐⭐⭐⭐</p>
      <p>S/. 320 por noche</p>
      <Link to="/detalle-hotel">
        <button>Ver Detalle</button>
      </Link>
    </div>

    <div className="card">
      <img
        src="https://picsum.photos/300/200?3"
        alt="Hotel Mar Paracas"
      />
      <h3>Hotel Mar Paracas</h3>
      <p>⭐⭐⭐⭐</p>
      <p>S/. 280 por noche</p>
      <Link to="/detalle-hotel">
        <button>Ver Detalle</button>
      </Link>
    </div>

  </div>

</section>

    </>
  );
}

export default Home;