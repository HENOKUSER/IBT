import { useLocation, Navigate } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = ({ children }) => {
  const searchedurl = useLocation();

  // const isSignIn = localStorage.getItem("signedIn");
  const { isSignedIn } = useAuth();

  return !isSignedIn ? (
    <Navigate to="/signin" state={{ from: searchedurl }} replace />
  ) : (
    children
  );
};

export default RequireAuth;
