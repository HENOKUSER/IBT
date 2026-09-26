import CartBadge from "../Cart/CartBadge ";
import useTheme from "../Theme/useTheme";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h1>Addis Et restaurant</h1>
      <CartBadge />

      <button onClick={toggleTheme}>
        {theme === "light" ? "dark mode" : "light mode"}
      </button>
    </div>
  );
};

export default Header;
