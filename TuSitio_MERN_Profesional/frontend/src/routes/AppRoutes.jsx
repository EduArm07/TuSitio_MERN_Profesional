import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../../../frontend/src/pages/Home";
import Login from "../../../frontend/src/pages/Login";
import Registro from "../../../frontend/src/pages/Registro";
import Hoteles from "../../../frontend/src/pages/Hoteles";
import DetalleHotel from "../../../frontend/src/pages/DetalleHotel";
import Reserva from "../../../frontend/src/pages/Reserva";
import Dashboard from "../../../frontend/src/pages/Dashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/registro" element={<Registro />} />

        <Route path="/hoteles" element={<Hoteles />} />

        <Route path="/detalle-hotel" element={<DetalleHotel />} />

        <Route path="/reserva" element={<Reserva />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;