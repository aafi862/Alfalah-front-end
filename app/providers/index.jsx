"use client";

import { Provider } from "react-redux";
import store from "../Redux-store";

export default function Providers({ children }) {
  // Here you can add future global providers like AuthProvider, APIProvider
  return <Provider store={store}>{children}</Provider>;
}
