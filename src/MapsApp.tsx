import { PlacesProvider } from "./context";
import { HomeScreen } from "./screens";


const MapsApp = () => {
  return (
    <PlacesProvider>
      <HomeScreen />
    </PlacesProvider>
  );
};

export default MapsApp;
