import { Button } from "antd";
import { ItineraryItem as Item } from "../types";

interface Props {
  item: Item;
  onRemove: (id: number) => void;
}

export default function ItineraryItem({ item, onRemove }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 10,
        border: "1px solid #ddd",
        marginBottom: 10,
        borderRadius: 6,
      }}
    >
      <div>
        <b>{item.name}</b>
        <div>Ngày: {item.day}</div>
        <div>{item.cost}k</div>
      </div>

      <Button danger onClick={() => onRemove(item.id)}>
        Xóa
      </Button>
    </div>
  );
}