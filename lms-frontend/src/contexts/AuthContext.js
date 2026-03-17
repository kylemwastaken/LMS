import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const safeToken = (value) => {
  if (!value || value === "null" || value === "undefined") return null;
  return value;
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => safeToken(localStorage.getItem("token")));
  const [role, setRole] = useState(() => localStorage.getItem("role") || null);

  const login = useCallback((newToken, newRole) => {
    const safe = safeToken(newToken);
    if (safe) {
      localStorage.setItem("token", safe);
      localStorage.setItem("role", newRole || "");
      setToken(safe);
      setRole(newRole || null);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  }, []);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === "token") {
        setToken(safeToken(event.newValue));
      }
      if (event.key === "role") {
        setRole(event.newValue || null);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isAuthenticated = useMemo(() => !!token, [token]);

  return (
    <AuthContext.Provider value={{ token, role, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
