// CurrencySelector.js
import React from "react";

const CurrencySetting = () => {
  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;

    // Save to localStorage
    localStorage.setItem("currency", selectedCurrency);

    // Dispatch a custom event
    window.dispatchEvent(new Event("currencyChanged"));
  };

  return (
    <div>
      <label>Select Currency: </label>
      <select onChange={handleCurrencyChange} defaultValue={localStorage.getItem("currency") || "USD"}>
        <option value="USD">USD ($)</option>
        <option value="CNY">CNY (¥)</option>
        <option value="SAR">SAR (﷼)</option>
      </select>
    </div>
  );
};

export default CurrencySetting;
