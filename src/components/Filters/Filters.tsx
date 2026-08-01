import "./Filters.css";

const categories = ["All", "Starter", "Main", "Sides", "Desert"];
const diets = ["All", "Veg", "Non-Veg"];

interface FiltersProps {
  selectedCategory: string;
  selectedDiet: string;
  searchTerm: string;
  onCategoryChange: (category: string) => void;
  onDietChange: (diet: string) => void;
  onSearchTermChange: (searchTerm: string) => void;
  onSearch: () => void;
}

function Filters({
  selectedCategory,
  selectedDiet,
  searchTerm,
  onCategoryChange,
  onDietChange,
  onSearchTermChange,
  onSearch,
}: FiltersProps) {
  return (
    <div className="filters-container">
      <div className="categories">
        <span className="filters-name">CATEGORY</span>
        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-button ${
                selectedCategory === category ? "active-button" : ""
              }`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="categories">
        <span className="filters-name">DIET</span>
        <div className="filter-buttons">
          {diets.map((diet) => (
            <button
              key={diet}
              type="button"
              className={`filter-button ${
                selectedDiet === diet ? "active-button" : ""
              }`}
              onClick={() => onDietChange(diet)}
            >
              {diet}
            </button>
          ))}
        </div>
      </div>
      <div className="search">
        <input
          className="search-input"
          placeholder="Search by name (e.g. chicken)"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSearch();
            }
          }}
        />
        <button type="button" className="active-button search-button" onClick={onSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Filters;
