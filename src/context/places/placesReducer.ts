import { PlacesState } from ".";

type PlaceAction =
  | { type: "setUserLocation"; payload: [number, number] }
  | { type: "second"; payload: PlacesState }
  | { type: "third"; payload: PlacesState };

export default (
  state: PlacesState,
  { type, payload }: PlaceAction
): PlacesState => {
  switch (type) {
    case "setUserLocation":
      return { ...state, isLoading: false, userLocation: payload };

    default:
      return state;
  }
};
