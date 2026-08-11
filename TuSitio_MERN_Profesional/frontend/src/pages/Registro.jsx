import Navbar from "../components/Navbar";

function Registro() {
  return (
    <>
      <Navbar />

      <div className="login-container">

        <div className="login-card">

          <h1>Crear Cuenta</h1>

          <p>
            Regístrate en TuSitio.com
          </p>

          <form>

            <input
              type="text"
              placeholder="Nombre completo"
            />

            <input
              type="email"
              placeholder="Correo electrónico"
            />

            <input
              type="password"
              placeholder="Contraseña"
            />

            <input
              type="password"
              placeholder="Confirmar contraseña"
            />

            <button type="submit">
              Registrarse
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default Registro;