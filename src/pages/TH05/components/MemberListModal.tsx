import { Modal, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Member, MemberListModalProps } from "../types/type";

const MemberListModal = ({ open, members, onClose }: MemberListModalProps) => {
  const columns: ColumnsType<Member> = [
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
    },
    {
      title: "Vai trò",
      render: (_, record) =>
        record.role === "leader" ? (
          <Tag color="blue">Leader</Tag>
        ) : (
          <Tag>Member</Tag>
        ),
    },
    {
      title: "Ngày tham gia",
      dataIndex: "joinDate",
    },
  ];

  return (
    <Modal
      title="Danh sách thành viên"
      visible={open}
      onCancel={onClose}
      footer={null}
    >
      <Table rowKey="id" columns={columns} dataSource={members} />
    </Modal>
  );
};

export default MemberListModal;