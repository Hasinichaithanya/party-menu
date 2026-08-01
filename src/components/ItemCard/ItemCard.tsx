import type { Item } from "../../interfaces/Item";
import { useNavigate } from "react-router-dom";
import "./ItemCard.css";

interface ItemCardProps {
  item: Item;
  removeItem?: (id: number) => void;
}
function ItemCard({ item, removeItem }: ItemCardProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/menu/${item.id}`);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeItem?.(item.id);
  };

  return (
    <div className="item-card" onClick={handleNavigate}>
      <div className="image-float">
        <img src={item.image} alt={item.name} className="item-image" />
        <span className={item.isVeg ? "veg-badge" : "non-veg-badge"}>
          {item.isVeg ? "VEG" : "NON-VEG"}
        </span>
      </div>

      <div className="item-details">
        <span className="item-category">{item.category.toUpperCase()}</span>
        <p className="item-name">{item.name}</p>
        <span className="item-description desc">{item.description}</span>
        <br />
        <span className="item-description">{item.servings} people</span>
      </div>
      {removeItem && (
        <button className="remove-button" type="button" onClick={handleRemove}>
          Remove
        </button>
      )}
    </div>
  );
}

export default ItemCard;
