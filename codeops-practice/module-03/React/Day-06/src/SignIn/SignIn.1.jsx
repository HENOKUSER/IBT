import React from "react";

export const SignIn = () => {
  const navigate = useNavigate();
  const signinToggle = () => {
    setIsSigned(localStorage.setItem("signedIn", true));
  };
  return (
    <div>
      <button onClick={signinToggle}>sign in</button>
    </div>
  );
};
