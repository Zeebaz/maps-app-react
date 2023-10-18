import { Feature } from "@/interfaces/places";
import { PlacesState } from ".";

type PlaceAction =
  | { type: "setUserLocation"; payload: [number, number] }
  | { type: "setPlaces"; payload: Feature[] }
  | { type: "setLoadingPlaces"; payload: boolean };

export default (
  state: PlacesState,
  { type, payload }: PlaceAction
): PlacesState => {
  switch (type) {
    case "setUserLocation":
      return { ...state, isLoading: false, userLocation: payload };

    case "setPlaces":
      return { ...state, isLoadingPlaces: false, places: payload };

    case "setLoadingPlaces":
      return { ...state, isLoadingPlaces: true, places: [] };

    default:
      return state;
  }
};
