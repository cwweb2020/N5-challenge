// src/components/AddProduct/AddProduct.js
import React, { useState, useContext } from "react";
import { DataContext } from "../../context";
import "./add-product.scss";

const AddProduct = () => {
  const { setProductsList } = useContext(DataContext);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    amount: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProductsList((prevProducts) => [
      ...prevProducts,
      {
        ...newProduct,
        id: prevProducts.length + 1,
        price: parseInt(newProduct.price),
        amount: parseInt(newProduct.amount),
      },
    ]);
    setNewProduct({ name: "", price: "", amount: "", img: "" });
    setTimeout(() => {
      alert("Producto agregado correctamente");
    }, 1000);
  };

  return (
    <section className="add-product">
      <h2>Agregar Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Cantidad</label>
          <input
            type="number"
            name="amount"
            value={newProduct.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Imagen URL</label>
          <input
            type="text"
            name="img"
            value={newProduct.img}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Agregar Producto</button>
      </form>
    </section>
  );
};

export default AddProduct;
