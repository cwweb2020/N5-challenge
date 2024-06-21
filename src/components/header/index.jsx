import React, { useContext } from "react";
import "./header.scss";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";
import { DataContext } from "../../context";

const Header = () => {
  const { cart } = useContext(DataContext);

  // calculate total amount of items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  //
  return (
    <section className="header">
      <div className="header__wrapper">
        <Link to="/">
          <h1>Inicio</h1>
        </Link>

        <div className="header__cart">
          <Link to="/add-product" className="header__link">
            Agregar Producto
          </Link>
          <Link data-testid="cart-icon" to="/cart">
            <LuShoppingCart />{" "}
            {totalItems > 0 && (
              <span className="header__cart-count">{totalItems}</span>
            )}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;
