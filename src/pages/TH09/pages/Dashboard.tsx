import { Row, Col } from "antd";
import StatCard from "../components/StatCard";
import { TaskStats } from "../types/task";

interface Props {
  stats: TaskStats;
}

export default function Dashboard({ stats }: Props) {
  return (
    <Row gutter={16}>
      <Col>
        <StatCard title="Tổng task" value={stats.total} />
      </Col>
      <Col>
        <StatCard title="Hoàn thành" value={stats.done} />
      </Col>
      <Col>
        <StatCard title="Quá hạn" value={stats.overdue} />
      </Col>
    </Row>
  );
}