import { ItineraryItem as Item } from "../types";
import ItineraryItem from "./ItineraryItem";

interface Props {
  list: Item[];
  onRemove: (id: number) => void;
}

export default function ItineraryList({ list, onRemove }: Props) {
  return (
    <div>
      {list.map((item) => (
        <ItineraryItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </div>
  );
}