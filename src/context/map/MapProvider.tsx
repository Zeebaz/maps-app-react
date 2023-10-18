import {
  type PropsWithChildren,
  useReducer,
  useContext,
  useEffect,
} from "react";
import { MapContext } from "./mapContext";
import mapReducer from "./mapReducer";
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { PlacesContext } from "..";
import { directionsApi } from "@/apis";
import { DirectionsResponse } from "@/interfaces/directions";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

export const MapProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    state.markers.forEach((m) => m.remove());
    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(
        `<h6>${place.text_es}</h6><p>${place.place_name_es}</p>`
      );
      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(state.map!);
      newMarkers.push(newMarker);
    }
    // TODO: limpiar polylines
    dispatch({ type: "setMarkers", payload: newMarkers });
  }, [places]);

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup().setHTML(
      `<h4>Estas aqui</h4><p>${map.getCenter().toString()}</p>`
    );

    new Marker({ color: "red" })
      .setPopup(myLocationPopup)
      .setLngLat(map.getCenter())
      .addTo(map);
    dispatch({ type: "setMap", payload: map });
  };

  const getRouterBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const response = await directionsApi.get<DirectionsResponse>(
      `/${start.join(",")};${end.join(",")}`
    );
    let { distance, duration, geometry } = response.data.routes[0];
    const { coordinates: coords } = geometry;

    let kms = distance / 1000;
    kms = Math.round(kms * 100) / 100;
    const minutes = Math.floor(duration / 60);
    console.log({ kms, minutes, geometry });

    const bounds = new LngLatBounds(start, start);

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, {
      padding: 200,
    });

    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (state.map?.getLayer("route")) {
      state.map?.removeLayer("route");
      state.map?.removeSource("route");
    }

    state.map?.addSource("route", sourceData);
    // state.map?.addSource("RouterString id", sourceData);
    state.map?.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "black",
        "line-width": 3,
      },
    });
  };

  return (
    <MapContext.Provider value={{ ...state, setMap, getRouterBetweenPoints }}>
      {children}
    </MapContext.Provider>
  );
};
