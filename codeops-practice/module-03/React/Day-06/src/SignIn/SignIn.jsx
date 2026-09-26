import { useNavigate, useLocation } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const signinToggle = () => {
    localStorage.setItem("signedIn", true);
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
