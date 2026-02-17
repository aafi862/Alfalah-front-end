"use client";

import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import store from "../Redux-store";
import { hydrateAuth, logout } from "../Redux-store/slices/authSlice";

const AUTH_STORAGE_KEY = "auth";

const parseAuthFromStorage = () => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

function BootstrapAuth() {
  useEffect(() => {
    const auth = parseAuthFromStorage();
    if (!auth) {
      store.dispatch(hydrateAuth(null));
      return;
    }

    if (!auth.accessToken || !auth.role) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      store.dispatch(logout());
      return;
    }

    store.dispatch(hydrateAuth(auth));
  }, []);

  return null;
}

function PersistAuth() {
  const auth = useSelector((state) => state.auth);
  const { isHydrated, isAuthenticated, user, accessToken, refreshToken, role } = auth;

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return;
    }

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        user,
        accessToken,
        refreshToken,
        role,
      })
    );
  }, [accessToken, isAuthenticated, isHydrated, refreshToken, role, user]);

  return null;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <BootstrapAuth />
      <PersistAuth />
      {children}
    </Provider>
  );
}
