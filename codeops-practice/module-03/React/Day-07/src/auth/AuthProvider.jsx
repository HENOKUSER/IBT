import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(
    () => localStorage.getItem("signedIn") === "true",
  );

  const signIn = () => {
    setIsSignedIn(true);
    localStorage.setItem("signedIn", "true");
  };

  const signOut = () => {
    setIsSignedIn(false);
    localStorage.removeItem("signedIn");
  };

  const value = { isSignedIn, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
