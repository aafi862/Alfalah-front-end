// Redux slice for authentication
// Stores user info, role, accessToken, refreshToken, and isAuthenticated
// Uses localStorage to persist state across refresh

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    role: null,
    isAuthenticated: false,
    isHydrated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        hydrateAuth: (state, action) => {
            const payload = action.payload || {};
            state.user = payload.user || null;
            state.accessToken = payload.accessToken || null;
            state.refreshToken = payload.refreshToken || null;
            state.role = payload.role || null;
            state.isAuthenticated = Boolean(payload.accessToken && payload.role);
            state.isHydrated = true;
        },
        setAuth: (state, action) => {
            const { user, accessToken, refreshToken, role } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.role = role;
            state.isAuthenticated = true;
            state.isHydrated = true;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.role = null;
            state.isAuthenticated = false;
            state.isHydrated = true;
        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
    },
});

export const { hydrateAuth, setAuth, logout, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;
