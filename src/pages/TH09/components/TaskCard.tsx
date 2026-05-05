import { Card, Tag } from "antd";
import { Task } from "../types/task";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  return (
    <Card size="small" style={{ marginBottom: 8 }}>
      <h4>{task.title}</h4>

      <p style={{ fontSize: 12, color: "#666" }}>
        {task.description}
      </p>

      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {task.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div style={{ marginTop: 8 }}>
        <Tag color="red">{task.priority}</Tag>
      </div>

      <div style={{ fontSize: 12, marginTop: 4 }}>
        Deadline: {task.deadline}
      </div>
    </Card>
  );
}