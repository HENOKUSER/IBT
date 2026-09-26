// CategoryBar.jsx
import styles from "./CategoryBar.module.css";

const CategoryBar = ({ categories, selected, onSelect }) => {
  return (
    <div className={styles.bar}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={cat === selected ? styles.active : styles.tab}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
