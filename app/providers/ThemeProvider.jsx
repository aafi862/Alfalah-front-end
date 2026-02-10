// app/ThemeWrapper.jsx
"use client";

import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function ThemeWrapper({ children }) {
    const darkMode = useSelector((state) => state.ui.darkMode);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return children;
}
