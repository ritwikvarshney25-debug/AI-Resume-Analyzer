import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="171899712924-rparlpfp0qihf10lh4ga92bmq35n99tc.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);