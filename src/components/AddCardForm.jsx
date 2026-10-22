import { useRef, useState } from "react";
import { RARITIES, SETS, parseRarity } from "../domain/card.js";

const EMPTY_DRAFT = { name: "", set: SETS[0], rarity: "commune", price: "", quantity: "1" };

function toNumber(text) {
  return text.trim() === "" ? NaN : Number(text.replace(",", "."));
}

function validate(draft) {
  const errors = [];
  if (draft.name.trim().length < 2) {
    errors.push("Le nom doit faire au moins 2 caractères.");
  }
  const price = toNumber(draft.price);
  if (Number.isNaN(price) || price < 0) {
    errors.push("Le prix doit être un nombre positif ou nul.");
  }
  const quantity = toNumber(draft.quantity);
  if (!Number.isInteger(quantity) || quantity < 1) {
    errors.push("La quantité doit être un entier supérieur ou égal à 1.");
  }
  return errors;
}

function AddCardForm({ onAdd }) {
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef(null);
  const errors = validate(draft);

  function update(field, value) {
    setDraft((previous) => ({ ...previous, [field]: value }));
  }

  function reset() {
    setDraft(EMPTY_DRAFT);
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    if (errors.length > 0) return;
    onAdd({
      name: draft.name.trim(),
      set: draft.set,
      rarity: draft.rarity,
      price: toNumber(draft.price),
      quantity: toNumber(draft.quantity),
    });
    reset();
    nameRef.current?.focus();
  }

  return (
    <form className="add-form" noValidate onSubmit={handleSubmit}>
      <label>
        Nom <input ref={nameRef} value={draft.name} onChange={(event) => update("name", event.target.value)} />
      </label>
      <label>
        Extension{" "}
        <select value={draft.set} onChange={(event) => update("set", event.target.value)}>
          {SETS.map((set) => (
            <option key={set} value={set}>
              {set}
            </option>
          ))}
        </select>
      </label>
      <label>
        Rareté{" "}
        <select
          value={draft.rarity}
          onChange={(event) => update("rarity", parseRarity(event.target.value) ?? "commune")}
        >
          {RARITIES.map((rarity) => (
            <option key={rarity} value={rarity}>
              {rarity}
            </option>
          ))}
        </select>
      </label>
      <label>
        Prix{" "}
        <input inputMode="decimal" value={draft.price} onChange={(event) => update("price", event.target.value)} />
      </label>
      <label>
        Quantité{" "}
        <input
          type="number"
          min="1"
          value={draft.quantity}
          onChange={(event) => update("quantity", event.target.value)}
        />
      </label>
      {submitted && errors.length > 0 && (
        <ul className="errors error">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="actions">
        <button type="submit">Ajouter la carte</button>
        <button type="button" onClick={reset}>
          Vider
        </button>
      </div>
    </form>
  );
}

export default AddCardForm;
