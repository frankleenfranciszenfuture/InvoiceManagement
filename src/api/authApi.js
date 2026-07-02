import axios from "axios";

const API_URL = "http://localhost:8081/api/v1.0";

export const authApi = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      withCredentials: true,
    });
    return response.data;
  },

  logout: async () => {
    const response = await axios.post(
      `${API_URL}/logout`,
      {},
      { withCredentials: true },
    );
    return response.data;
  },
};
