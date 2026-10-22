import { useEffect, useState } from "react";
import { fetchCards } from "../api/cards.js";

export function useCards() {
  const [state, setState] = useState({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;
    fetchCards()
      .then((cards) => {
        if (!ignore) setState({ status: "success", cards });
      })
      .catch((error) => {
        if (!ignore) {
          setState({ status: "error", message: error instanceof Error ? error.message : String(error) });
        }
      });
    return () => {
      ignore = true;
    };
  }, [attempt]);

  function updateCards(transform) {
    setState((previous) =>
      previous.status === "success" ? { ...previous, cards: transform(previous.cards) } : previous,
    );
  }

  function changeQuantity(id, delta) {
    updateCards((cards) =>
      cards.map((card) => (card.id === id ? { ...card, quantity: Math.max(0, card.quantity + delta) } : card)),
    );
  }

  function removeCard(id) {
    updateCards((cards) => cards.filter((card) => card.id !== id));
  }

  function addCard(newCard) {
    updateCards((cards) => [...cards, { ...newCard, id: crypto.randomUUID() }]);
  }

  function resetQuantities() {
    updateCards((cards) => cards.map((card) => ({ ...card, quantity: 1 })));
  }

  function retry() {
    setState({ status: "loading" });
    setAttempt((previous) => previous + 1);
  }

  return { state, retry, changeQuantity, removeCard, addCard, resetQuantities };
}
