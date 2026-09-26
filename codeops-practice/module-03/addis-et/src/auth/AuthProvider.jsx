// AuthProvider.jsx
import { createContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("addisEats_currentUser");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "addisEats_currentUser",
        JSON.stringify(currentUser),
      );
    } else {
      localStorage.removeItem("addisEats_currentUser");
    }
  }, [currentUser]);

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("addisEats_users") || "[]");
    if (users.some((u) => u.email === email)) {
      throw new Error("An account with this email already exists");
    }
    const newUser = { name, email, password };
    localStorage.setItem(
      "addisEats_users",
      JSON.stringify([...users, newUser]),
    );
    setCurrentUser({ name, email });
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("addisEats_users") || "[]");
    const match = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!match) {
      throw new Error("Incorrect email or password");
    }
    setCurrentUser({ name: match.name, email: match.email });
  };

  const logout = () => setCurrentUser(null);

  const isSignedIn = Boolean(currentUser);

  const value = useMemo(
    () => ({ currentUser, isSignedIn, register, login, logout }),
    [currentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export { AuthContext };
