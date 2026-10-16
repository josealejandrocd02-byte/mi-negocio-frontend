import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import L from "leaflet";
import { GoogleOAuthProvider } from "@react-oauth/google";
delete (L.Icon.Default.prototype as any)._getIconUrl;


const GOOGLE_CLIENT_ID =
  "993533064507-cg1vdsu5ejqbnqg2shm5vdblec0cmbic.apps.googleusercontent.com";
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
  </HelmetProvider>
);
