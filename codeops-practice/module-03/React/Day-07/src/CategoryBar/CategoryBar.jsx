import React from "react";

const CategoryBar = ({ categories, selected, onSelect }) => {
  return (
    <div>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{ color: selected === cat ? "red" : "black" }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
