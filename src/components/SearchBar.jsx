import { useEffect, useRef } from "react";
import { RARITIES, parseRarity } from "../domain/card.js";

function SearchBar({ query, onQueryChange, rarity, onRarityChange }) {
  const inputRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onQueryChange("");
      } else if (event.key === "/" && !event.target.closest("input, textarea, select, [contenteditable]")) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onQueryChange]);

  function handleClear() {
    onQueryChange("");
    inputRef.current?.focus();
  }

  return (
    <div className="toolbar" role="search">
      <label>
        Recherche{" "}
        <input ref={inputRef} type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} />
      </label>
      <button type="button" onClick={handleClear} disabled={query === ""}>
        Effacer
      </button>
      <label>
        Rareté{" "}
        <select value={rarity} onChange={(event) => onRarityChange(parseRarity(event.target.value) ?? "toutes")}>
          <option value="toutes">Toutes</option>
          {RARITIES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default SearchBar;
