import React from "react";

const Footer = () => {
  return (
    <div style={footer}>
      <h2>Trabajo realizado por C.M F.</h2>
    </div>
  );
};

const footer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "25vh",
  backgroundColor: "black",
  color: "white",
};

export default Footer;
