import React from "react";
import GoogleTranslate from "../Utilities/GoogleTranslate";
import CurrencySetting from "../Utilities/CurrencySetting";

const Setting = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px" }}>⚙️ Settings</h2>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <GoogleTranslate />
      </div>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <CurrencySetting />
      </div>
    </div>
  );
};

export default Setting;
