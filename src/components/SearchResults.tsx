import { MapContext, PlacesContext } from "@/context";
import { Feature } from "@/interfaces/places";
import { useContext, useState } from "react";
export const SearchResults = () => {
  const [activeId, setActiveId] = useState("");
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouterBetweenPoints } = useContext(MapContext);

  const onPlaceClicked = (place: Feature) => {
    const [lng, lat] = place.center;
    setActiveId(place.id);
    map?.flyTo({
      zoom: 14,
      center: [lng, lat],
    });
  };

  const getRoute = (place: Feature) => {
    if (!userLocation) return;
    const [lng, lat] = place.center;
    getRouterBetweenPoints([lng, lat], userLocation!);
  };

  if (isLoadingPlaces) {
    return (
      <ul className="list-group mt-3 ">
        <li className="list-group-item list-group-item-action text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </li>
      </ul>
    );
  }

  if (places.length === 0) {
    return <></>;
  }

  return (
    <ul className="list-group mt-3">
      {places.map((place) => (
        <li
          key={place.id}
          className={`list-group-item list-group-item-action pointer ${
            activeId === place.id ? "active" : ""
          }`}
          onClick={() => onPlaceClicked(place)}
        >
          <h6>{place.text_es}</h6>
          <p style={{ fontSize: "12px" }}>{place.place_name_es}</p>
          <button
            onClick={() => getRoute(place)}
            className={`btn btn-outline-${
              activeId === place.id ? "light" : "primary"
            } btn-sm `}
          >
            {" "}
            View address{" "}
          </button>
        </li>
      ))}
    </ul>
  );
};
