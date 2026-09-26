import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const signinToggle = () => {
    signIn();
    const destination = location.state?.from?.pathname || "/";
    navigate(destination);
  };

  return (
    <div>
      <button onClick={signinToggle}>sign in</button>
    </div>
  );
};

export default SignIn;
