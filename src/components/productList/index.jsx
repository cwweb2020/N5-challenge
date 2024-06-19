import React, { useContext } from "react";
import { DataContext } from "../../context";
import SingleProduct from "../singleProduct";
import "./product-list.scss";

const ProductList = () => {
  const { productsList } = useContext(DataContext);

  return (
    <>
      <h2
        style={{ textAlign: "center", marginBottom: "38px", fontSize: "2em" }}
      >
        Lista de Productos
      </h2>
      <div className="product__container">
        {productsList.products.map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
