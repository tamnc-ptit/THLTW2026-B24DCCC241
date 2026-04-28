import { useState } from "react";
import { Button, Space, Input, Select, DatePicker } from "antd";
import WorkoutTable from "../../components/WorkoutTable";
import WorkoutForm from "../../components/WorkoutForm";
import { workouts as mockData } from "../../mock/workouts";

const { RangePicker } = DatePicker;

export default function Workouts() {
  const [data, setData] = useState(mockData);
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateRange, setDateRange] = useState<any>(null);

  // ================= CRUD =================
  const handleAdd = () => {
    setEditing(null);
    setVisible(true);
  };

  const handleEdit = (record: any) => {
    setEditing(record);
    setVisible(true);
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
    setVisible(false);
  };

  // ================= FILTER =================
  const filteredData = data.filter((item) => {
    const matchSearch = item.type
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchType = typeFilter ? item.type === typeFilter : true;

    const matchDate = dateRange
      ? item.date >= dateRange[0]?.format("YYYY-MM-DD") &&
        item.date <= dateRange[1]?.format("YYYY-MM-DD")
      : true;

    return matchSearch && matchType && matchDate;
  });

  return (
    <>
      {/* ===== FILTER ===== */}
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm theo loại..."
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Select
          placeholder="Loại bài tập"
          allowClear
          style={{ width: 150 }}
          onChange={(v) => setTypeFilter(v)}
        >
          <Select.Option value="Cardio">Cardio</Select.Option>
          <Select.Option value="Strength">Strength</Select.Option>
          <Select.Option value="Yoga">Yoga</Select.Option>
          <Select.Option value="HIIT">HIIT</Select.Option>
        </Select>

        <RangePicker onChange={(v) => setDateRange(v)} />

        <Button type="primary" onClick={handleAdd}>
          Thêm buổi tập
        </Button>
      </Space>

      {/* ===== TABLE ===== */}
      <WorkoutTable
        data={filteredData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* ===== FORM ===== */}
      <WorkoutForm
        visible={visible}
        onCancel={() => setVisible(false)}
        onSubmit={handleSubmit}
        initialValues={editing}
      />
    </>
  );
}