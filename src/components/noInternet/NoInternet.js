// NoInternet.js

import React from "react";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const iconStyle = {
  fontSize: "48px",
  marginBottom: "16px",
  color: "#f44336",
};

const messageStyle = {
  textAlign: "center",
  fontSize: "20px",
  color: "#333",
};
const NoInternet = () => {
  return (
    <div style={containerStyle}>
      <div style={iconStyle}>
        <i className="material-icons">wifi_off</i>
      </div>
      <div style={messageStyle}>
        No internet connection. Please check your network settings and try
        again.
      </div>
    </div>
  );
};

export default NoInternet;
