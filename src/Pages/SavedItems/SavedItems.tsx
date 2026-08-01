import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import { LocalStorageKeys } from "../../constants/constants";
import data from "../../data/dishes.json";
import type { Item } from "../../interfaces/Item";
import "./SavedItems.css";

function SavedItems() {
  const navigate = useNavigate();
  const [savedIds, setSavedIds] = useState<number[]>(() => {
    const savedItems = localStorage.getItem(LocalStorageKeys.SAVED_ITEMS);

    if (!savedItems) {
      return [];
    }

    try {
      return JSON.parse(savedItems) as number[];
    } catch {
      return [];
    }
  });

  const savedItems = savedIds
    .map((savedId) => data.find((item: Item) => item.id === savedId))
    .filter((item): item is Item => item !== undefined);

  const removeSavedItem = (id: number) => {
    const nextSavedIds = savedIds.filter((savedId) => savedId !== id);
    localStorage.setItem(
      LocalStorageKeys.SAVED_ITEMS,
      JSON.stringify(nextSavedIds)
    );
    setSavedIds(nextSavedIds);
  };

  return (
    <main className="saved-items-page">
      <header className="saved-items-header">
        <div>
          <h1>Saved Recipes</h1>
          <p>{savedItems.length} recipes saved</p>
        </div>
        <button type="button" onClick={() => navigate("/")}>
          Back to Menu
        </button>
      </header>

      {savedItems.length > 0 ? (
        <div className="saved-items-container">
          {savedItems.map((item) => (
            <ItemCard item={item} removeItem={removeSavedItem} />
          ))}
        </div>
      ) : (
        <div className="saved-items-empty">
          <p>No saved recipes yet.</p>
          <button type="button" onClick={() => navigate("/")}>
            Browse the menu
          </button>
        </div>
      )}
    </main>
  );
}

export default SavedItems;
