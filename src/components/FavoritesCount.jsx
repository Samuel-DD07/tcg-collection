import { useFavorites } from "../context/favorites.js";

function FavoritesCount() {
  const { favoriteIds } = useFavorites();
  return <p>★ {favoriteIds.length} favori(s)</p>;
}

export default FavoritesCount;
