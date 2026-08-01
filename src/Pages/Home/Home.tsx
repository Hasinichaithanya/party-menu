import { useMemo, useState } from "react";
import Filters from "../../components/Filters/Filters";
import Header from "../../components/Header/Header";
import ItemCard from "../../components/ItemCard/ItemCard";
import data from "../../data/dishes.json";
import type { Item } from "../../interfaces/Item";
import "./Home.css";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDiet, setSelectedDiet] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedSearch = submittedSearch.trim().toLowerCase();

    return data.filter((item: Item) => {
      const matchesCategory =
        selectedCategory === "All" ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesDiet =
        selectedDiet === "All" ||
        (selectedDiet === "Veg" ? item.isVeg : !item.isVeg);
      const matchesSearch =
        !normalizedSearch || item.name.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesDiet && matchesSearch;
    });
  }, [selectedCategory, selectedDiet, submittedSearch]);

  return (
    <div className="home-page">
      <Header />
      <Filters
        selectedCategory={selectedCategory}
        selectedDiet={selectedDiet}
        searchTerm={searchTerm}
        onCategoryChange={setSelectedCategory}
        onDietChange={setSelectedDiet}
        onSearchTermChange={setSearchTerm}
        onSearch={() => setSubmittedSearch(searchTerm)}
      />
      <span className="items-count">{filteredItems.length} Items Found</span>
      <div className="dishes-container">
        {filteredItems.map((item: Item) => (
          <ItemCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
