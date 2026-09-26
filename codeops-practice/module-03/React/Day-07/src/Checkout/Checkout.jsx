import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const sigout = () => {
    localStorage.removeItem("signedIn");
    navigate("/");
  };
  return (
    <div>
      <p>Checkout page</p>
      <button onClick={sigout}>signout</button>
    </div>
  );
};

export default Checkout;
