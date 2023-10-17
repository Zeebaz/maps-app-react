import { placesContext as PlacesContext } from "./placesContext";
import { useReducer, type PropsWithChildren, useEffect } from "react";
import placesReducer from "./placesReducer";
import { getUserLocation } from "../../helpers";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
};

export const PlacesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((location) => {
      dispatch({ type: "setUserLocation", payload: location });
    });
  }, []);

  return (
    <PlacesContext.Provider value={{ ...state }}>
      {children}
    </PlacesContext.Provider>
  );
};
