import { useState } from "react";
import { FavoritesContext } from "./favorites.js";

function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);

  function toggleFavorite(id) {
    setFavoriteIds((previous) =>
      previous.includes(id) ? previous.filter((favoriteId) => favoriteId !== id) : [...previous, id],
    );
  }

  return <FavoritesContext value={{ favoriteIds, toggleFavorite }}>{children}</FavoritesContext>;
}

export default FavoritesProvider;
