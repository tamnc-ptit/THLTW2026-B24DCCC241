import { Table, Button, Space, Tag, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Club, ClubTableProps } from "../types/type";

const ClubTable = ({ data, onEdit, onDelete, onViewMembers }: ClubTableProps) => {
  const columns: ColumnsType<Club> = [
    {
  title: "Avatar",
  dataIndex: "avatar",
  render: (avatar: string) => (
    <img
      src={avatar}
      alt="avatar"
      style={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  ),
},
    {
      title: "Tên CLB",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Chủ nhiệm",
      dataIndex: "president",
    },
    {
      title: "Ngày thành lập",
      dataIndex: "foundedDate",
      sorter: (a, b) =>
        new Date(a.foundedDate).getTime() - new Date(b.foundedDate).getTime(),
    },
    {
      title: "Trạng thái",
      render: (_, record) =>
        record.isActive ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="red">Ngừng</Tag>
        ),
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => onEdit(record)}>
            Sửa
          </Button>

          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            onConfirm={() => onDelete(record.id)}
          >
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>

          <Button type="link" onClick={() => onViewMembers(record)}>
            Thành viên
          </Button>
        </Space>
      ),
    },
  ];

  return <Table rowKey="id" columns={columns} dataSource={data} />;
};

export default ClubTable;