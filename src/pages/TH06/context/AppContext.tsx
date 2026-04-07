import { createContext, useContext, useState } from "react";
import { ItineraryItem } from "../types";

interface AppContextType {
  itinerary: ItineraryItem[];
  setItinerary: React.Dispatch<React.SetStateAction<ItineraryItem[]>>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = (props: any) => {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);

  return (
    <AppContext.Provider value={{ itinerary, setItinerary }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("Context lỗi");
  return ctx;
};