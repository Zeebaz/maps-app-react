import { MapState } from "./MapProvider";

type MapsActions = 
|{ type: "first"; payload: MapState }
|{ type: "second"; payload: MapState }
|{ type: "third"; payload: MapState };

export default (state: MapState, { type, payload }: MapsActions) => {
  switch (type) {
    case 'first':
      return { ...state, ...payload };

    default:
      return state;
  }
};
