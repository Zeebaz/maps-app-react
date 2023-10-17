import React from "react";
import { type PropsWithChildren, useReducer } from "react";
import { mapContext as MapContext } from "./mapContext";
import { Map } from "mapbox-gl";
import mapReducer from "./mapReducer";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
};
export const MapProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  return (
    <MapContext.Provider value={{ ...state }}>{children}</MapContext.Provider>
  );
};
