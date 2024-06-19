import React from "react";
import "./home.scss";
import ProductList from "../../components/productList";
import Banner from "../../components/banner";

const Home = () => {
  return (
    <>
      <section className="home">
        <Banner />
        <ProductList />
      </section>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Home;
