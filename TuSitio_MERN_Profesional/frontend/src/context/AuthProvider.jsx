import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import { loginRequest, registerRequest, refreshAccessTokenRequest } from "../services/authService";

function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

function getInitialUser() {
  const token = localStorage.getItem("accessToken");
  if (!token || isTokenExpired(token)) return null;
  try {
    const decoded = jwtDecode(token);
    return { ...decoded, correo: localStorage.getItem("userEmail") };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);
  const [accessToken, setAccessToken] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return token && !isTokenExpired(token) ? token : null;
  });
  const [, setRefreshToken] = useState(() => localStorage.getItem("refreshToken"));
  const [checkingSession, setCheckingSession] = useState(true);

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  // Recuperar sesión al recargar (F5)
  useEffect(() => {
    async function recoverSession() {
      const storedAccess = localStorage.getItem("accessToken");
      const storedRefresh = localStorage.getItem("refreshToken");

      if (storedAccess && !isTokenExpired(storedAccess)) {
        setCheckingSession(false);
        return;
      }
      if (storedRefresh) {
        try {
          const data = await refreshAccessTokenRequest(storedRefresh);
          const decoded = jwtDecode(data.accessToken);
          setUser({ ...decoded, correo: localStorage.getItem("userEmail") });
          setAccessToken(data.accessToken);
          localStorage.setItem("accessToken", data.accessToken);
        } catch {
          logout();
        }
      }
      setCheckingSession(false);
    }
    recoverSession();
  }, []);

  const login = async (correo, password) => {
    const data = await loginRequest(correo, password);
    const decoded = jwtDecode(data.access);
    setUser({ ...decoded, correo: data.user?.correo });
    setAccessToken(data.access);
    setRefreshToken(data.refresh);
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
    localStorage.setItem("userEmail", data.user?.correo || "");
    return data;
  };

  const register = async (formData) => registerRequest(formData);

  const value = {
    user,
    accessToken,
    isAuthenticated: !!accessToken,
    checkingSession,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}