// app/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getInitialAuthState = () => {
    if (typeof window === "undefined") {
        return {
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            role: null,
        };
    }

    const stored = localStorage.getItem("auth");

    if (!stored) {
        return {
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            role: null,
        };
    }

    try {
        const parsed = JSON.parse(stored);
        return {
            ...parsed,
            isAuthenticated: true,
        };
    } catch {
        return {
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            role: null,
        };
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

            localStorage.setItem(
                "auth",
                JSON.stringify({ user, accessToken, refreshToken, role })
            );
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
            localStorage.setItem(
                "auth",
                JSON.stringify({ ...stored, accessToken: action.payload })
            );
        },
    },
});

export const { setAuth, logout, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;


















// // app/store/slices/authSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     user: null,
//     accessToken: null,
//     refreshToken: null,
//     isAuthenticated: false,
//     role: null,
// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         setAuth: (state, action) => {
//             const { user, accessToken, refreshToken, role, isAuthenticated } = action.payload;
//             state.user = user;
//             state.accessToken = accessToken;
//             state.refreshToken = refreshToken;
//             state.role = role;
//             state.isAuthenticated = isAuthenticated;

//             // persist
//             localStorage.setItem("auth", JSON.stringify(action.payload));
//         },
//         logout: (state) => {
//             state.user = null;
//             state.accessToken = null;
//             state.refreshToken = null;
//             state.role = null;
//             state.isAuthenticated = false;
//             localStorage.removeItem("auth");
//         },
//         hydrateAuth: (state, action) => {
//             return { ...state, ...action.payload, isAuthenticated: true };
//         },
//         updateAccessToken: (state, action) => {
//             state.accessToken = action.payload;
//             const stored = JSON.parse(localStorage.getItem("auth"));
//             localStorage.setItem("auth", JSON.stringify({ ...stored, accessToken: action.payload }));
//         },
//     },
// });

// export const { setAuth, logout, hydrateAuth, updateAccessToken } = authSlice.actions;
// export default authSlice.reducer;
