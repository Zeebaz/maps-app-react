import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import mapboxgl from "mapbox-gl";

import MapsApp from "./MapsApp";

mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_TOKEN;

if (!navigator.geolocation) {
  alert("Tu navegador no soporta la geolocalización");
  throw new Error("Tu navegador no soporta la geolocalización");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);
