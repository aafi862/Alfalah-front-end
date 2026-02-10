// app/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true;

            // persist
            localStorage.setItem("auth", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem("auth");
        },
        hydrateAuth: (state, action) => {
            return { ...state, ...action.payload, isAuthenticated: true };
        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload;
            const stored = JSON.parse(localStorage.getItem("auth"));
            localStorage.setItem("auth", JSON.stringify({ ...stored, accessToken: action.payload }));
        },
    },
});

export const { setAuth, logout, hydrateAuth, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;
