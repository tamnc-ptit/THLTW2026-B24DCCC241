import { Table, Button, Space, Tag, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Member } from "../types/type";

interface Props {
  data: Member[];
  onEdit: (m: Member) => void;
  onDelete: (id: number) => void;
}

const MemberTable = ({ data, onEdit, onDelete }: Props) => {
  const columns: ColumnsType<Member> = [
    { title: "Tên", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "SĐT", dataIndex: "phone" },
    {
      title: "Vai trò",
      render: (_, r) =>
        r.role === "leader" ? <Tag color="blue">Leader</Tag> : <Tag>Member</Tag>,
    },
    { title: "CLB", dataIndex: "clubId" },

    {
      title: "Hành động",
      render: (_, r) => (
        <Space>
          <Button onClick={() => onEdit(r)}>Sửa</Button>

          <Popconfirm title="Xóa?" onConfirm={() => onDelete(r.id)}>
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table rowKey="id" columns={columns} dataSource={data} />;
};

export default MemberTable;