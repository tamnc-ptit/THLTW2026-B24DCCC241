import { useState } from "react";
import {
  Table,
  Button,
  Tag,
  Modal,
  Input,
  Space,
  message,
} from "antd";

import type { Application, Status } from "../types/type";

interface Props {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
}

const ApplicationManagement = ({ applications, setApplications }: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [rejectModal, setRejectModal] = useState(false);
  const [reason, setReason] = useState("");

  const renderStatus = (status: Status) => {
    if (status === "approved") return <Tag color="green">Approved</Tag>;
    if (status === "rejected") return <Tag color="red">Rejected</Tag>;
    return <Tag color="orange">Pending</Tag>;
  };

  const columns = [
    { title: "Họ tên", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "SĐT", dataIndex: "phone" },
    { title: "Giới tính", dataIndex: "gender" },
    { title: "Địa chỉ", dataIndex: "address" },
    { title: "Sở trường", dataIndex: "skill" },
    { title: "CLB", dataIndex: "clubId" },
    { title: "Lý do", dataIndex: "reason" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: renderStatus,
    },
    { title: "Ghi chú", dataIndex: "note" },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) =>
      setSelectedRowKeys(keys as number[]),
  };

  const handleApprove = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Chọn ít nhất 1 đơn");
      return;
    }

    const updated: Application[] = applications.map((app) =>
      selectedRowKeys.includes(app.id)
        ? {
            ...app,
            status: "approved" as Status,
            note: "",
          }
        : app
    );

    setApplications(updated);
    setSelectedRowKeys([]);
    message.success("Đã duyệt!");
  };

  const openRejectModal = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Chọn ít nhất 1 đơn");
      return;
    }
    setRejectModal(true);
  };

  const handleReject = () => {
    if (!reason) {
      message.error("Phải nhập lý do từ chối");
      return;
    }

    const updated: Application[] = applications.map((app) =>
      selectedRowKeys.includes(app.id)
        ? {
            ...app,
            status: "rejected" as Status,
            note: reason,
          }
        : app
    );

    setApplications(updated);
    setSelectedRowKeys([]);
    setReason("");
    setRejectModal(false);

    message.success("Đã từ chối!");
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          disabled={selectedRowKeys.length === 0}
          onClick={handleApprove}
        >
          Duyệt {selectedRowKeys.length} đơn
        </Button>

        <Button
          danger
          disabled={selectedRowKeys.length === 0}
          onClick={openRejectModal}
        >
          Từ chối {selectedRowKeys.length} đơn
        </Button>
      </Space>

      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={applications}
      />

      <Modal
        title="Nhập lý do từ chối"
        visible={rejectModal}
        onOk={handleReject}
        onCancel={() => setRejectModal(false)}
      >
        <Input.TextArea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Nhập lý do..."
        />
      </Modal>
    </div>
  );
};

export default ApplicationManagement;