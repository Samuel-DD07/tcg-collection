import { useState } from "react";
import AddCardForm from "./components/AddCardForm.jsx";
import CardGrid from "./components/CardGrid.jsx";
import CardNotes from "./components/CardNotes.jsx";
import FavoritesCount from "./components/FavoritesCount.jsx";
import Panel from "./components/Panel.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Summary from "./components/Summary.jsx";
import { collectionValue, formatPrice } from "./domain/card.js";
import { useCards } from "./hooks/useCards.js";
import { useDocumentTitle } from "./hooks/useDocumentTitle.js";

function App() {
  const { state, retry, changeQuantity, removeCard, addCard, resetQuantities } = useCards();
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState("toutes");
  const [selectedId, setSelectedId] = useState(null);

  const cards = state.status === "success" ? state.cards : [];
  const value = collectionValue(cards);
  useDocumentTitle(`Ma collection (${formatPrice(value)})`);

  if (state.status === "loading") {
    return (
      <main className="app">
        <p className="hint">Chargement de la collection…</p>
      </main>
    );
  }

  if (state.status === "error") {
    return (
      <main className="app">
        <p className="error">{state.message}</p>
        <button type="button" onClick={retry}>
          Réessayer
        </button>
      </main>
    );
  }

  const search = query.trim().toLowerCase();
  const visibleCards = cards.filter(
    (card) =>
      (card.name.toLowerCase().includes(search) || card.set.toLowerCase().includes(search)) &&
      (rarity === "toutes" || card.rarity === rarity),
  );
  const selectedCard = cards.find((card) => card.id === selectedId);

  return (
    <main className="app">
      <header className="app-header">
        <h1>Ma collection TCG</h1>
        <Summary cards={cards} />
        <FavoritesCount />
        <button type="button" onClick={resetQuantities}>
          Tout à 1 exemplaire
        </button>
      </header>
      <Panel title="Ajouter une carte">
        <AddCardForm onAdd={addCard} />
      </Panel>
      {selectedCard && <CardNotes key={selectedCard.id} card={selectedCard} />}
      <Panel title={`Mes cartes (${visibleCards.length} / ${cards.length})`}>
        <SearchBar query={query} onQueryChange={setQuery} rarity={rarity} onRarityChange={setRarity} />
        <CardGrid
          cards={visibleCards}
          selectedId={selectedId}
          onQuantityChange={changeQuantity}
          onRemove={removeCard}
          onSelect={setSelectedId}
        />
      </Panel>
    </main>
  );
}

export default App;
