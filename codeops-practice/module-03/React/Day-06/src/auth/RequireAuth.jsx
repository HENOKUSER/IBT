import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const searchedurl = useLocation();

  const isSignIn = localStorage.getItem("signedIn");

  return !isSignIn ? (
    <Navigate to="/signin" state={{ from: searchedurl }} replace />
  ) : (
    children
  );
};

export default RequireAuth;
