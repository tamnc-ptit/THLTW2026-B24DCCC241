import { Card } from "antd";

interface Props {
  title: string;
  value: number;
}

export default function StatCard({ title, value }: Props) {
  return (
    <Card style={{ width: 200 }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </Card>
  );
}