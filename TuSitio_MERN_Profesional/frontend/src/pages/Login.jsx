import Navbar from "../components/Navbar";

function Login() {
  return (
    <>
      <Navbar />

      <div className="login-container">

        <div className="login-card">

          <h1>Iniciar Sesión</h1>

          <p>
            Accede a tu cuenta de TuSitio.com
          </p>

          <form>

            <input
              type="email"
              placeholder="Correo electrónico"
            />

            <input
              type="password"
              placeholder="Contraseña"
            />

            <button type="submit">
              Iniciar Sesión
            </button>

          </form>

          <p className="registro-link">
            ¿No tienes cuenta? Regístrate
          </p>

        </div>

      </div>
    </>
  );
}

export default Login;