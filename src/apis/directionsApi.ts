import axios from "axios";

const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    access_token: import.meta.env.VITE_MAP_BOX_TOKEN,
    geometries: "geojson",
    language: "es",
    alternatives: false,
    overview: "simplified",
    steps: false,
  },
});

export default directionsApi;
