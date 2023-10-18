import { PlacesContext } from "@/context";
import { ChangeEvent, useContext } from "react";
import { useRef } from "react";
import { SearchResults } from ".";

export const SearchBar = () => {
  const debounceRef = useRef<NodeJS.Timeout>();
  const { searchPlacesByTerm } = useContext(PlacesContext);

  const onQueryChange = (event: ChangeEvent<HTMLInputElement> | undefined) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {      
      await searchPlacesByTerm(event?.target.value!);
    }, 500);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar un lugar..."
        onChange={onQueryChange}
      />
      <SearchResults />
    </div>
  );
};
