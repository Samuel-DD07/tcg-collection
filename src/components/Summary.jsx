import { collectionValue, copyCount, formatPrice } from "../domain/card.js";

function Summary({ cards }) {
  return (
    <p className="summary">
      {cards.length} cartes · {copyCount(cards)} exemplaires · {formatPrice(collectionValue(cards))}
    </p>
  );
}

export default Summary;
