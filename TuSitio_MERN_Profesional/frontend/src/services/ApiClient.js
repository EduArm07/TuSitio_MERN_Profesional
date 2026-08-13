const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("accessToken");
  const config = {
    ...options,
    headers: {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
  return fetch(`${API_URL}${endpoint}`, config);
}