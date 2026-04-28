import { useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Tag,
  Input,
  Select,
  Popconfirm,
} from "antd";
import ExerciseModal from "../../components/ExerciseModal";
import { exercises as mockData } from "../../mock/exercises";

export default function Exercises() {
  const [data, setData] = useState(mockData);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const [search, setSearch] = useState("");
  const [muscleFilter, setMuscleFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  // ================= TAG =================
  const getLevelTag = (level: string) => {
    if (level === "easy") return <Tag color="green">Dễ</Tag>;
    if (level === "medium") return <Tag color="gold">Trung bình</Tag>;
    return <Tag color="red">Khó</Tag>;
  };

  // ================= CRUD =================
  const handleAdd = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditing(item);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleSubmit = (values: any) => {
    if (editing) {
      setData(
        data.map((item) =>
          item.id === editing.id ? { ...item, ...values } : item
        )
      );
    } else {
      setData([...data, { ...values, id: Date.now() }]);
    }
    setOpen(false);
  };

  // ================= FILTER =================
  const filteredData = data.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchMuscle = muscleFilter
      ? item.muscle === muscleFilter
      : true;

    const matchLevel = levelFilter
      ? item.level === levelFilter
      : true;

    return matchSearch && matchMuscle && matchLevel;
  });

  return (
    <>
      {/* ===== FILTER ===== */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Input
            placeholder="Tìm bài tập..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col span={6}>
          <Select
            placeholder="Nhóm cơ"
            allowClear
            style={{ width: "100%" }}
            onChange={(v) => setMuscleFilter(v)}
          >
            <Select.Option value="Chest">Chest</Select.Option>
            <Select.Option value="Back">Back</Select.Option>
            <Select.Option value="Legs">Legs</Select.Option>
            <Select.Option value="Core">Core</Select.Option>
          </Select>
        </Col>

        <Col span={6}>
          <Select
            placeholder="Mức độ"
            allowClear
            style={{ width: "100%" }}
            onChange={(v) => setLevelFilter(v)}
          >
            <Select.Option value="easy">Dễ</Select.Option>
            <Select.Option value="medium">Trung bình</Select.Option>
            <Select.Option value="hard">Khó</Select.Option>
          </Select>
        </Col>

        <Col span={6}>
          <Button type="primary" onClick={handleAdd}>
            Thêm bài tập
          </Button>
        </Col>
      </Row>

      {/* ===== GRID ===== */}
      <Row gutter={16}>
        {filteredData.map((item) => (
          <Col span={8} key={item.id}>
            <Card
              title={item.name}
              extra={
                <>
                  <Button onClick={() => handleEdit(item)}>Sửa</Button>
                  <Popconfirm
                    title="Xóa bài tập?"
                    onConfirm={() => handleDelete(item.id)}
                  >
                    <Button danger>Xóa</Button>
                  </Popconfirm>
                </>
              }
            >
              <p>Nhóm cơ: {item.muscle}</p>
              <p>Mức độ: {getLevelTag(item.level)}</p>
              <p>Calo/giờ: {item.caloriesPerHour}</p>
              <p>{item.description}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ===== MODAL ===== */}
      <ExerciseModal
        open={open}
        onCancel={() => setOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editing}
      />
    </>
  );
}