import api from "./api";

// ── Dashboard ──────────────────────────────────────
export const fetchDashboardStats = () => api.get("/dashboard/stats");
