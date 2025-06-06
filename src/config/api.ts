export const BASE_URL =
  import.meta.env.VITE_APP_SERVER_BASE_URL ||
  "http://xn--b1albin0a.xn--p1ai:8083/api";

export const api = {
  days: (id?: number | string) => (id ? `/days/${id}` : `/days`),
};
