import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    access_token: import.meta.env.VITE_MAP_BOX_TOKEN,
    limit: 5,
    language: "es",
  },
});

export default searchApi;
