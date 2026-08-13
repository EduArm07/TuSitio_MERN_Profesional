import { apiFetch } from "./ApiClient";

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || data.message || "Error en la solicitud");
  return data;
}

export async function getList(resource, params = {}) {
  const query = new URLSearchParams(params);
  const res = await apiFetch(`/${resource}?${query.toString()}`);
  return handleResponse(res);
}

export async function create(resource, body) {
  const res = await apiFetch(`/${resource}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

export async function update(resource, id, body) {
  const res = await apiFetch(`/${resource}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

export async function remove(resource, id) {
  const res = await apiFetch(`/${resource}/${id}`, { method: "DELETE" });
  return handleResponse(res);
}

export async function action(resource, id, path, body = {}) {
  const res = await apiFetch(`/${resource}/${id}/${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}