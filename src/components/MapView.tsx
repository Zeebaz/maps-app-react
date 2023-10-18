import { MapContext, PlacesContext } from "@/context";
import { useContext, useLayoutEffect, useRef } from "react";
import { Loading } from "@/screens";
import { Map } from "mapbox-gl";

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapDivRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDivRef.current!, // container ID  | HTML element
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      });
      setMap(map);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      ref={mapDivRef}
      style={{
        backgroundColor: "red",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      Aqui ira mi geolocation {JSON.stringify(userLocation)}
    </div>
  );
};
