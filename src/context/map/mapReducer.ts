import { Map, Marker } from "mapbox-gl";
import { MapState } from "./MapProvider";

type MapsActions =
  | { type: "setMap"; payload: Map }
  | { type: "setMarkers"; payload: Marker[] }
  | { type: "third"; payload: MapState };

export default (state: MapState, { type, payload }: MapsActions) => {
  switch (type) {
    case "setMap":
      return { ...state, isMapReady: true, map: payload };

    case "setMarkers":
      return { ...state, markers: payload };
    default:
      return state;
  }
};
