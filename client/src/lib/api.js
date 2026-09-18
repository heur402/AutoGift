const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const headers = options.body
    ? { "Content-Type": "application/json", ...options.headers }
    : options.headers;
  const response = await fetch(`${API_URL}${path}`, {
    ...(headers ? { headers } : {}),
    ...options,
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || "Request failed");
  return data;
}

export const api = {
  products: (query = "") => request(`/products${query}`),
  product: (id) => request(`/products/${id}`),
  users: (query = "") => request(`/users${query}`),
  user: (id) => request(`/users/${id}`),
  createUser: (user) =>
    request("/users", { method: "POST", body: JSON.stringify(user) }),
  updateUserStatus: (id, status) =>
    request(`/users/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  createNotification: (userId, message) =>
    request("/notifications", { method: "POST", body: JSON.stringify({ userId, message }) }),
  orders: (query = "") => request(`/orders${query}`),
  createOrder: (order) =>
    request("/orders", { method: "POST", body: JSON.stringify(order) }),
  updateOrderStatus: (id, status) =>
    request(`/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  revenue: () => request("/revenue/summary"),
  notifications: (userId) => request(`/notifications/${userId}`),
};
