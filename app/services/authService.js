// app/services/authService.js
import api from "./api";

export const loginApi = async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    return data; // { user, accessToken, refreshToken }
};

export const refreshApi = async (refreshToken) => {
    const { data } = await api.post("/auth/refresh", { refreshToken });
    return data;
};
