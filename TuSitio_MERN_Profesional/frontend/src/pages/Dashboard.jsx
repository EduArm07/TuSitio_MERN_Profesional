import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">

        <aside className="sidebar">

          <h2>Mi Cuenta</h2>

          <ul>
            <li>🏠 Dashboard</li>
            <li>👤 Mi Perfil</li>
            <li>📅 Mis Reservas</li>
            <li>📜 Historial</li>
            <li>⚙️ Configuración</li>
          </ul>

        </aside>

        <main className="dashboard-content">

          <h1>Bienvenido</h1>

          <p>
            Gestiona tus reservas y tu información personal.
          </p>

          <div className="dashboard-cards">

            <div className="dashboard-card">
              <h3>Reservas Activas</h3>
              <p>3</p>
            </div>

            <div className="dashboard-card">
              <h3>Reservas Completadas</h3>
              <p>12</p>
            </div>

            <div className="dashboard-card">
              <h3>Hoteles Visitados</h3>
              <p>7</p>
            </div>

          </div>

        </main>

      </div>
    </>
  );
}

export default Dashboard;