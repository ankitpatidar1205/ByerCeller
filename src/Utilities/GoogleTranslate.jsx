import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // Define the init function globally before the script loads
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ar,zh-CN", // Add more languages if needed
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Avoid loading multiple times
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <h4 className="mb-3">🌐 Language Setting</h4>
      <div
        style={{
          display: "inline-block",
          padding: "10px 15px",
          backgroundColor: "#ffffff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <div
          id="google_translate_element"
          style={{
            minWidth: "200px",
            fontSize: "16px",
            fontWeight: "500",
          }}
        ></div>
      </div>
    </div>
  );
};

export default GoogleTranslate;
