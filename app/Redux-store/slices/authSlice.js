// Redux slice for authentication
// Stores user info, role, accessToken, refreshToken, and isAuthenticated
// Uses localStorage to persist state across refresh

import { createSlice } from "@reduxjs/toolkit";

const getInitialAuthState = () => {
    if (typeof window === "undefined") return { user: null, accessToken: null, refreshToken: null, role: null, isAuthenticated: false };

    const stored = localStorage.getItem("auth");
    if (!stored) return { user: null, accessToken: null, refreshToken: null, role: null, isAuthenticated: false };

    try {
        const parsed = JSON.parse(stored);
        return { ...parsed, isAuthenticated: true };
    } catch {
        return { user: null, accessToken: null, refreshToken: null, role: null, isAuthenticated: false };
    }
};

const initialState = getInitialAuthState();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            const { user, accessToken, refreshToken, role } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.role = role;
            state.isAuthenticated = true;
            localStorage.setItem("auth", JSON.stringify({ user, accessToken, refreshToken, role }));
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.role = null;
            state.isAuthenticated = false;
            localStorage.removeItem("auth");
        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload;
            const stored = JSON.parse(localStorage.getItem("auth") || "{}");
            localStorage.setItem("auth", JSON.stringify({ ...stored, accessToken: action.payload }));
        },
    },
});

export const { setAuth, logout, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;
