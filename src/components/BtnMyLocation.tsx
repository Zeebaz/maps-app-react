import { MapContext, PlacesContext } from "@/context";
import { useContext } from "react";

export const BtnMyLocation = () => {
  const { isMapReady, map } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);
  const handleClick = () => {
    if (isMapReady) throw new Error("Mapa no esta listo");
    if (!userLocation) throw new Error("No hay ubicacion del usuario");

    map?.flyTo({
      zoom: 14,
      center: map.getCenter(),
    });
  };

  return (
    <button
      onClick={handleClick}
      className="btn btn-primary "
      style={{ position: "fixed", top: 20, right: 20 }}
    >
      My Location
    </button>
  );
};
