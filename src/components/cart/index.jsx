import React, { useContext } from "react";
import { DataContext } from "../../context";
import "./cart.scss";

const Cart = () => {
  const { cart, clearCart, purchaseCart } = useContext(DataContext);

  //
  // calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <section className="cart">
        <h2>Carrito de Compras</h2>
        {cart.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart__item">
              <div className="cart__img">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="cart__details">
                <h3>{item.name}</h3>
                <p>Precio: {item.price} $</p>
                <p>Cantidad: {item.quantity}</p>
              </div>
            </div>
          ))
        )}
        <div className="cart__total">
          <h3>Total: {calculateTotal()} $</h3>
        </div>
        <div className="cart__actions">
          <button onClick={clearCart}>Limpiar</button>
        </div>
        <button className="purchase-button" onClick={purchaseCart}>
          Comprar
        </button>
      </section>

      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Cart;
