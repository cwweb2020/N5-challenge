import React from "react";
import "./banner.scss";

const Banner = ({ imgBanner = "/img/banner.jpg" }) => {
  return (
    <>
      <section className="banner">
        <img
          data-testid="img-banner"
          style={{ width: "100%" }}
          src={imgBanner}
          alt="banner"
        />

        <div className="overlay">
          <h3>z market</h3>
        </div>
      </section>
    </>
  );
};

export default Banner;
