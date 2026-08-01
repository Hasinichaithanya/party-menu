import { LocalStorageKeys } from "../../constants/constants";
import type { IUser } from "../../interfaces/LoginResponse";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const storedUserDetails = localStorage.getItem(LocalStorageKeys.USER_DETAILS);
  let userDetails: IUser | null = null;

  if (storedUserDetails) {
    try {
      userDetails = JSON.parse(storedUserDetails) as IUser;
    } catch {
      userDetails = null;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(LocalStorageKeys.TOKEN);
    localStorage.removeItem(LocalStorageKeys.USER_DETAILS);
    navigate("/login", { replace: true });
  };

  return (
    <div className="header">
      <div className="header-logo">
        <p className="menu-heading">Party Menu</p>
        <span>Welcome, {userDetails?.name}</span>
      </div>
      <div className="header-buttons">
        <button
          className="header-btns"
          onClick={() => navigate("/saved-recipes")}
        >
          Saved Recipes
        </button>
        <button className="header-btns" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
