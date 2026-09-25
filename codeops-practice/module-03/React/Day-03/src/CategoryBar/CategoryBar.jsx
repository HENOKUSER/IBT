const CategoryBar = ({ category, setCategory, selected }) => {
  const handleCatSelection = (cat) => {
    setCategory(cat);
    selected = cat;
  };

  return (
    <div>
      {category.map((cat,index) => (
        <button key={index} onClick={handleCatSelection}>{cat}</button>
      ))}
    </div>
  );
};

export default CategoryBar;
