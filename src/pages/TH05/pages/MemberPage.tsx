import { useState } from "react";
import { Table, Button, Modal, Select, Space, message, Tag } from "antd";
import type { Application, Club } from "../types/type";

interface Props {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  clubs?: Club[];
}

const mockClubs: Club[] = [
  { id: 1, name: "CLB IT", avatar: "", foundedDate: "", descriptionHtml: "", president: "", isActive: true },
  { id: 2, name: "CLB Bóng đá", avatar: "", foundedDate: "", descriptionHtml: "", president: "", isActive: true },
];

const MemberPage = ({ applications, setApplications, clubs }: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newClubId, setNewClubId] = useState<number | null>(null);

  const clubList = clubs || mockClubs;

  const members = applications.filter(a => a.status === "approved");

  const columns = [
    { title: "Họ tên", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "SĐT", dataIndex: "phone" },
    {
      title: "CLB",
      dataIndex: "clubId",
      render: (id: number) =>
        clubList.find(c => c.id === id)?.name || "Unknown",
    },
    {
      title: "Trạng thái",
      render: () => <Tag color="green">Approved</Tag>,
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) =>
      setSelectedRowKeys(keys as number[]),
  };

  const openModal = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Chọn ít nhất 1 thành viên");
      return;
    }
    setModalOpen(true);
  };

  const handleChangeClub = () => {
    if (!newClubId) {
      message.error("Chọn CLB");
      return;
    }

    const updated: Application[] = applications.map(app =>
      selectedRowKeys.includes(app.id)
        ? { ...app, clubId: newClubId }
        : app
    );

    setApplications(updated);
    setSelectedRowKeys([]);
    setNewClubId(null);
    setModalOpen(false);

    message.success("Đã chuyển CLB!");
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          disabled={selectedRowKeys.length === 0}
          onClick={openModal}
        >
          Chuyển CLB ({selectedRowKeys.length})
        </Button>
      </Space>

      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={members}
      />

      <Modal
        title={`Chuyển ${selectedRowKeys.length} thành viên`}
        visible={modalOpen}
        onOk={handleChangeClub}
        onCancel={() => setModalOpen(false)}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Chọn CLB mới"
          onChange={(value) => setNewClubId(value)}
          options={clubList.map(c => ({
            label: c.name,
            value: c.id,
          }))}
        />
      </Modal>
    </div>
  );
};

export default MemberPage;