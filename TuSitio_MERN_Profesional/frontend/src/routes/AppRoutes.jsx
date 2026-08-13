import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import { WebRouter } from "./WebRouter";
import { AdminRouter } from "./AdminRouter";
import { useAuth } from "../hooks/useAuth";
import "../scss/index.scss";

function AppContent() {
  const { checkingSession } = useAuth();

  if (checkingSession) {
    return <div style={{ padding: 40, textAlign: "center" }}>Cargando sesión...</div>;
  }

  return (
    <Routes>
      <Route path="/*" element={<WebRouter />} />
      <Route path="/admin/*" element={<AdminRouter />} />
    </Routes>
  );
}

export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}