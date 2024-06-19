import React from "react";

const Banner = ({ imgBanner = "/img/banner.jpg" }) => {
  return (
    <>
      <section style={container} className="banner">
        <img style={{ width: "100%" }} src={imgBanner} alt="banner" />
      </section>
    </>
  );
};

export default Banner;

const container = {
  width: "100%",
  height: "45vh",
  overflow: "hidden",
  objectFit: "cover",
  padding: "20px",
  margin: "0 0 100px 0",
};
