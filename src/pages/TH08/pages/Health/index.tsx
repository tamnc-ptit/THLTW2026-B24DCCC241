import { useState } from "react";
import { Table, Button, Tag, Popconfirm } from "antd";
import HealthForm from "../../components/HealthForm";
import { healthLogs as mockData } from "../../mock/health";

export default function Health() {
  const [data, setData] = useState(mockData);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  // ================= BMI =================
  const calcBMI = (w: number, h: number) => {
    return w / ((h / 100) ** 2);
  };

  const getBMITag = (bmi: number) => {
    if (bmi < 18.5) return <Tag color="blue">Thiếu cân</Tag>;
    if (bmi < 25) return <Tag color="green">Bình thường</Tag>;
    if (bmi < 30) return <Tag color="gold">Thừa cân</Tag>;
    return <Tag color="red">Béo phì</Tag>;
  };

  // ================= CRUD =================
  const handleSubmit = (values: any) => {
    const bmi = calcBMI(values.weight, values.height);

    if (editing) {
      setData(
        data.map((item) =>
          item.id === editing.id ? { ...item, ...values, bmi } : item
        )
      );
    } else {
      setData([...data, { ...values, bmi, id: Date.now() }]);
    }

    setOpen(false);
  };

  const handleEdit = (record: any) => {
    setEditing(record);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  // ================= TABLE =================
  const columns = [
    { title: "Ngày", dataIndex: "date" },
    { title: "Cân nặng", dataIndex: "weight" },
    { title: "Chiều cao", dataIndex: "height" },
    {
      title: "BMI",
      render: (_: any, record: any) => record.bmi.toFixed(1),
    },
    {
      title: "Phân loại",
      render: (_: any, record: any) => getBMITag(record.bmi),
    },
    { title: "Nhịp tim", dataIndex: "heartRate" },
    { title: "Giờ ngủ", dataIndex: "sleep" },
    {
      title: "Action",
      render: (_: any, record: any) => (
        <>
          <Button onClick={() => handleEdit(record)}>Sửa</Button>
          <Popconfirm
            title="Xóa dữ liệu?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => { setEditing(null); setOpen(true); }}>
        Thêm dữ liệu
      </Button>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        style={{ marginTop: 16 }}
      />

      <HealthForm
        open={open}
        onCancel={() => setOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editing}
      />
    </>
  );
}