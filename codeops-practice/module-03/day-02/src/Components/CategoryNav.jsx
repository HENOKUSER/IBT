import React, { useState } from "react";
import PropTypes from "prop-types";

const CategoryNav = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSelect(inputValue.trim() === "" ? null : inputValue.trim());
  };

  const handleClear = () => {
    setInputValue("");
    onSelect(null);
  };

  return (
    <nav className="CategoryNav">
      <form className="category-search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search category (e.g. vegetarian)..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>
    </nav>
  );
};

CategoryNav.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default CategoryNav;
