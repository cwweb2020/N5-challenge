import React from "react";

const Footer = () => {
  return (
    <div style={footer}>
      <h1>Footer</h1>
    </div>
  );
};

const footer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "30vh",
  backgroundColor: "black",
  color: "white",
};

export default Footer;
