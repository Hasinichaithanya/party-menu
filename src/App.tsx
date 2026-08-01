import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import ProtectedRoute from "./Pages/ProtectedRoute";
import SavedItems from "./Pages/SavedItems/SavedItems";
import ItemDetails from "./Pages/ItemDetails/ItemDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/saved-recipes" element={<SavedItems />} />
            <Route path="menu/:id" element={<ItemDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
