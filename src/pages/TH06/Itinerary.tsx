import { useApp } from "./context/AppContext";
import ItineraryList from "./components/ItineraryList";

export default function Itinerary() {
  const { itinerary, setItinerary } = useApp();

  const remove = (id: number) => {
    setItinerary(itinerary.filter((i) => i.id !== id));
  };

  const total = itinerary.reduce((s, i) => s + i.cost, 0);

  return (
    <>
      <h2>Lịch trình</h2>
      <ItineraryList list={itinerary} onRemove={remove} />
      <h3>Tổng: {total}k</h3>
    </>
  );
}