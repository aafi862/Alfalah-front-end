// app/services/authService.js
import api from "./api";

// export const loginApi = async (payload) => {
//     const { data } = await api.post("/auth/login", payload);
//     return data; // { user, accessToken, refreshToken }
// };



export const loginApi = async ({ email, password }) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!email || !password) return reject("Invalid credentials");

            let role = null;
            if (email.endsWith("@company.com")) role = "company";
            else if (email.endsWith("@user.com")) role = "user";
            else if (email.endsWith("@admin.com")) role = "admin";
            else if (email.endsWith("@agent.com")) role = "agent";

            if (!role) return reject("Invalid credentials");

            resolve({
                user: { name: email.split("@")[0], email },
                accessToken: "fake-access-token",
                refreshToken: "fake-refresh-token",
                role,
            });
        }, 1000);
    });
};


export const refreshApi = async (refreshToken) => {
    const { data } = await api.post("/auth/refresh", { refreshToken });
    return data;
};
