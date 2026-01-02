import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// const hotpepperApiKey = import.meta.env.VITE_HOTPEPPER_API_KEY;
// console.log("Hot Pepper API Key:", hotpepperApiKey);
// const hotpepperApiUrl = import.meta.env.VITE_HOTPEPPER_API_URL;
// console.log("Hot Pepper API URL:", hotpepperApiUrl);
