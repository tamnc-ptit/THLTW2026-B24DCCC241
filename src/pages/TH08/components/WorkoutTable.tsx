import { Table, Button, Popconfirm, Tag } from "antd";

export default function WorkoutTable({ data, onEdit, onDelete }: any) {
  const getStatusTag = (status: string) => {
    return status === "completed" ? (
      <Tag color="green">Hoàn thành</Tag>
    ) : (
      <Tag color="red">Bỏ lỡ</Tag>
    );
  };

  const columns = [
    { title: "Ngày", dataIndex: "date" },
    { title: "Loại", dataIndex: "type" },
    { title: "Thời lượng (phút)", dataIndex: "duration" },
    { title: "Calo", dataIndex: "calories" },
    { title: "Ghi chú", dataIndex: "note" },
    {
      title: "Trạng thái",
      render: (_: any, record: any) => getStatusTag(record.status),
    },
    {
      title: "Action",
      render: (_: any, record: any) => (
        <>
          <Button onClick={() => onEdit(record)}>Sửa</Button>
          <Popconfirm
            title="Xóa buổi tập?"
            onConfirm={() => onDelete(record.id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return <Table rowKey="id" columns={columns} dataSource={data} />;
}