import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, updateAccessToken } from "@/app/Redux-store/slices/authSlice";

const mockDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const resolveRoleFromEmail = (email) => {
  if (email.endsWith("@admin.com")) return "admin";
  if (email.endsWith("@company.com")) return "company";
  if (email.endsWith("@agent.com")) return "agent";
  if (email.endsWith("@user.com")) return "user";
  return null;
};

const getErrorMessage = (error) => {
  if (!error) return "Unexpected error";
  if (typeof error === "string") return error;
  if (typeof error.data === "string") return error.data;
  if (error.data?.message) return error.data.message;
  if (error.error) return error.error;
  return "Request failed";
};

const maybeMockRequest = async (args) => {
  const useMock = process.env.NEXT_PUBLIC_ENABLE_API_MOCK === "true" || !process.env.NEXT_PUBLIC_API_URL;
  if (!useMock) return null;

  const request = typeof args === "string" ? { url: args, method: "GET" } : args;
  const method = (request.method || "GET").toUpperCase();

  if (request.url === "/auth/login" && method === "POST") {
    await mockDelay(900);

    const email = request.body?.email?.trim()?.toLowerCase();
    const password = request.body?.password;

    if (!email || !password) {
      return { error: { status: 400, data: { message: "Email and password are required" } } };
    }

    const role = resolveRoleFromEmail(email);
    if (!role) {
      return { error: { status: 401, data: { message: "Invalid credentials" } } };
    }

    return {
      data: {
        user: { name: email.split("@")[0], email },
        accessToken: "fake-access-token",
        refreshToken: "fake-refresh-token",
        role,
      },
    };
  }

  if (request.url === "/auth/refresh" && method === "POST") {
    await mockDelay(400);

    if (!request.body?.refreshToken) {
      return { error: { status: 401, data: { message: "Refresh token expired" } } };
    }

    return { data: { accessToken: "fake-access-token-refreshed" } };
  }

  return { error: { status: 501, data: { message: `Mock handler missing for ${method} ${request.url}` } } };
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("content-type", "application/json");
    return headers;
  },
});

const baseQuery = async (args, api, extraOptions) => {
  const mockResult = await maybeMockRequest(args);
  if (mockResult) {
    return mockResult;
  }

  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshToken = api.getState()?.auth?.refreshToken;

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data?.accessToken) {
      api.dispatch(updateAccessToken(refreshResult.data.accessToken));
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      return {
        error: {
          status: refreshResult.error?.status || 401,
          data: { message: getErrorMessage(refreshResult.error) },
        },
      };
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["Auth", "User", "Dashboard"],
  endpoints: () => ({}),
});
