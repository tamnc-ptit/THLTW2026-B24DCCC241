
import { Card, Rate, Button } from "antd";
import { Destination } from "../types";

const { Meta } = Card;

interface Props {
  item: Destination;
  onAdd?: (item: Destination) => void;
}

// Chuyển sang Named Export để ép hệ thống nhận diện đúng Function
export const DestinationCard = ({ item, onAdd }: Props) => {
  return (
    <Card
      hoverable
      style={{ marginBottom: 16 }}
      cover={
        <img
          src={item.image}
          alt={item.name}
          style={{ height: 200, objectFit: "cover" }}
        />
      }
    >
      <Meta 
        title={<span style={{ fontWeight: 'bold' }}>{item.name}</span>} 
        description={item.location} 
      />

      <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Rate disabled value={item.rating} style={{ fontSize: 14 }} />
        <span style={{ fontWeight: 'bold', color: '#f5222d', fontSize: 16 }}>
          💰 {item.cost}k
        </span>
      </div>

      <Button
        type="primary"
        block
        style={{ marginTop: 16, borderRadius: 4 }}
        onClick={() => onAdd?.(item)}
      >
        Thêm vào lịch trình
      </Button>
    </Card>
  );
};