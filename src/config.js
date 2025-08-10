const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "" // Use Vite proxy for dev
    : ""; // Empty string for production → relative API calls (no domain)

export default API_BASE_URL;
