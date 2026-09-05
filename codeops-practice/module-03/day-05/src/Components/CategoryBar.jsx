import React from "react";
import PropTypes from "prop-types";

const CategoryBar = ({ categories, activeCategory, onSelect }) => {
  return (
    <nav className="CategoryBar">
      <button
        className={activeCategory === null ? "chip active" : "chip"}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={activeCategory === category ? "chip active" : "chip"}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

CategoryBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

CategoryBar.defaultProps = {
  activeCategory: null,
};

export default CategoryBar;
