import { useEffect, useState } from "react";

const GoogleTranslate = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Define global callback before loading the script
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ar,zh-CN",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
      setIsLoaded(true); // Hide loader when loaded
    };

    // Load script only once
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.defer = true;
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
          minHeight: "40px",
          minWidth: "200px",
          position: "relative",
        }}
      >
        {!isLoaded && (
          <div style={{ textAlign: "center", padding: "10px", fontSize: "14px" }}>
            Loading Translator...
          </div>
        )}
        <div
          id="google_translate_element"
          style={{
            fontSize: "16px",
            fontWeight: "500",
            display: isLoaded ? "block" : "none",
          }}
        ></div>
      </div>
    </div>
  );
};

export default GoogleTranslate;
