import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        TuSitio.com
      </div>

      <div className="menu">
        <Link to="/">Inicio</Link>
        <Link to="/hoteles">Hoteles</Link>
        <Link to="/login">Iniciar Sesión</Link>
        <Link to="/registro">Registrarse</Link>
      </div>

    </nav>
  );
}

export default Navbar;