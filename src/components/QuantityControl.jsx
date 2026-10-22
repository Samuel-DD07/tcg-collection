function QuantityControl({ quantity, onChange }) {
  function handleDecrement() {
    onChange(-1);
  }

  function handleIncrement() {
    onChange(1);
  }

  return (
    <div className="quantity-control">
      <button type="button" aria-label="Retirer un exemplaire" onClick={handleDecrement} disabled={quantity === 0}>
        −
      </button>
      <strong>{quantity}</strong>
      <button type="button" aria-label="Ajouter un exemplaire" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
}

export default QuantityControl;
