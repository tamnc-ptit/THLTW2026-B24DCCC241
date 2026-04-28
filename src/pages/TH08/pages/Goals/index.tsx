import { useState } from "react";
import {
  Card,
  Button,
  Progress,
  Input,
  Popconfirm,
  Segmented,
  Tag,
  Row,
  Col,
} from "antd";
import GoalDrawer from "../../components/GoalDrawer";
import { goals as mockData } from "../../mock/goals";

export default function Goals() {
  const [data, setData] = useState(mockData);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  // ================= STATUS =================
  const getStatus = (goal: any) => {
    if (goal.current >= goal.target) return "done";
    return "active";
  };

  const getStatusTag = (status: string) => {
    if (status === "done") return <Tag color="green">Đã đạt</Tag>;
    if (status === "cancel") return <Tag color="red">Đã hủy</Tag>;
    return <Tag color="blue">Đang thực hiện</Tag>;
  };

  // ================= CRUD =================
  const handleAdd = (values: any) => {
    setData([...data, { ...values, id: Date.now(), status: "active" }]);
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    setData(data.filter((g) => g.id !== id));
  };

  const handleUpdateCurrent = (id: number, value: number) => {
    setData(
      data.map((g) =>
        g.id === id ? { ...g, current: Number(value) } : g
      )
    );
  };

  // ================= FILTER =================
  const filteredData =
    filter === "all"
      ? data
      : data.filter((g) => getStatus(g) === filter);

  return (
    <>
      {/* ===== HEADER ===== */}
      <Button type="primary" onClick={() => setOpen(true)}>
        Thêm mục tiêu
      </Button>

      <Segmented
        options={[
          { label: "Tất cả", value: "all" },
          { label: "Đang làm", value: "active" },
          { label: "Đã đạt", value: "done" },
        ]}
        value={filter}
        onChange={(v) => setFilter(v as string)}
        style={{ marginLeft: 16 }}
      />

      {/* ===== LIST ===== */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        {filteredData.map((goal) => {
          const percent = Math.min(
            100,
            Math.round((goal.current / goal.target) * 100)
          );

          const status = getStatus(goal);

          return (
            <Col span={8} key={goal.id}>
              <Card
                title={goal.name}
                extra={
                  <Popconfirm
                    title="Xóa mục tiêu?"
                    onConfirm={() => handleDelete(goal.id)}
                  >
                    <Button danger>Xóa</Button>
                  </Popconfirm>
                }
              >
                <p>Loại: {goal.type}</p>
                <p>Deadline: {goal.deadline}</p>

                {getStatusTag(status)}

                <Progress percent={percent} />

                {/* INLINE EDIT */}
                <Input
                  type="number"
                  value={goal.current}
                  onChange={(e) =>
                    handleUpdateCurrent(goal.id, Number(e.target.value))
                  }
                  addonAfter={`/${goal.target}`}
                />
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* ===== DRAWER ===== */}
      <GoalDrawer
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAdd}
      />
    </>
  );
}