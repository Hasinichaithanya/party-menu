import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LocalStorageKeys } from "../../constants/constants";
import data from "../../data/dishes.json";
import type { Item } from "../../interfaces/Item";
import "./ItemDetails.css";

function ItemDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const item = data.find((dish: Item) => dish.id === Number(id));
  const [isSaved, setIsSaved] = useState(() => {
    const savedItems = localStorage.getItem(LocalStorageKeys.SAVED_ITEMS);

    if (!savedItems) {
      return false;
    }

    try {
      const savedIds = JSON.parse(savedItems) as number[];
      return savedIds.includes(Number(id));
    } catch {
      return false;
    }
  });

  if (!item) {
    return (
      <main className="item-details-page item-details-empty">
        <h1>Recipe not found</h1>
        <button type="button" onClick={() => navigate("/")}>
          Back to Menu
        </button>
      </main>
    );
  }

  const handleSave = () => {
    const savedItems = localStorage.getItem(LocalStorageKeys.SAVED_ITEMS);
    // eslint-disable-next-line no-useless-assignment
    let savedIds: number[] = [];

    try {
      savedIds = savedItems ? (JSON.parse(savedItems) as number[]) : [];
    } catch {
      savedIds = [];
    }

    const nextSavedIds = isSaved
      ? savedIds.filter((savedId) => savedId !== item.id)
      : [...new Set([...savedIds, item.id])];

    localStorage.setItem(
      LocalStorageKeys.SAVED_ITEMS,
      JSON.stringify(nextSavedIds)
    );
    setIsSaved(!isSaved);
  };

  return (
    <div className="item-details-page">
      <div className="item-details-actions">
        <button type="button" onClick={() => navigate("/")}>
          Back to Menu
        </button>
        <div className="item-details-buttons">
          <button type="button" onClick={() => navigate("/saved-recipes")}>
            Saved Recipes
          </button>
          <button
            className="save-recipe-button"
            type="button"
            onClick={handleSave}
          >
            {isSaved ? "Saved Recipe" : "Save Recipe"}
          </button>
        </div>
      </div>

      <div className="item-details-container">
        <img src={item.image} alt={item.name} className="item-details-image" />
        <div className="item-details">
          <div className="item-details-tags">
            <span className="item-details-category">{item.category}</span>
            {item.isVeg && <span className="item-details-veg">Leaf Veg</span>}
          </div>
          <h1>{item.name}</h1>
          <p className="item-details-servings">{item.servings}</p>
          <p className="item-details-description">{item.fullDescription}</p>
        </div>
      </div>

      <div className="ingredients-panel">
        <h2>Ingredients</h2>
        <ul className="ingredients-list">
          {item.ingredients.map((ingredient) => (
            <li key={ingredient.name}>
              <strong>{ingredient.name}</strong>
              <span>{ingredient.quantity}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ItemDetails;
