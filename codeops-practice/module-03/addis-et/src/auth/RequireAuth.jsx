import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = ({ children }) => {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) return <Navigate to="/signin" replace />;
  return children;
};
export default RequireAuth;
