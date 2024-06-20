import React, { useContext, useState } from "react";
import "./single-product.scss";
import { DataContext } from "../../context";

const SingleProduct = ({ product }) => {
  const { addToCart } = useContext(DataContext);
  const { name, amount, price, img, id } = product;
  const [quantity, setQuantity] = useState(1); // Estado para almacenar la cantidad

  const handleAddToCart = (id) => {
    addToCart(id, quantity);
    alert("Producto agregado al carrito");
    setQuantity(1);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
  };

  return (
    <>
      <section className="card">
        <div className="card__img">
          <img src={img} alt={name} />
        </div>
        <h2 className="card__title">{name}</h2>
        <div className="card__tag-container">
          <p className="card__price">{price} $</p>
          <p className="card__amount">Cantidad: {amount}</p>
        </div>
        <div className="card__button-container">
          <button onClick={() => handleAddToCart(id)} disabled={amount === 0}>
            Agregar al carrito
          </button>
          <input
            type="number"
            min="1"
            max={amount}
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
