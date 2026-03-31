import React from "react";
import { Card, Row, Col, Statistic, Table, Tag } from "antd";
import type { Club, Application } from "../types/type";

interface Props {
  applications: Application[];
  clubs: Club[];
}

const ReportPage: React.FC<Props> = ({ applications, clubs }) => {
  const totalClubs = clubs.length;

  const totalPending = applications.filter(a => a.status === "pending").length;
  const totalApproved = applications.filter(a => a.status === "approved").length;
  const totalRejected = applications.filter(a => a.status === "rejected").length;

  const dataSource = clubs.map(club => {
    const clubApps = applications.filter(a => a.clubId === club.id);
    return {
      key: club.id,
      clubName: club.name,
      pending: clubApps.filter(a => a.status === "pending").length,
      approved: clubApps.filter(a => a.status === "approved").length,
      rejected: clubApps.filter(a => a.status === "rejected").length,
    };
  });

  const columns = [
    { title: "Câu lạc bộ", dataIndex: "clubName", key: "clubName" },
    {
      title: "Pending",
      dataIndex: "pending",
      key: "pending",
      render: (count: number) => <Tag color="orange">{count}</Tag>,
    },
    {
      title: "Approved",
      dataIndex: "approved",
      key: "approved",
      render: (count: number) => <Tag color="green">{count}</Tag>,
    },
    {
      title: "Rejected",
      dataIndex: "rejected",
      key: "rejected",
      render: (count: number) => <Tag color="red">{count}</Tag>,
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Tổng CLB" value={totalClubs} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Pending"
              value={totalPending}
              valueStyle={{ color: "orange" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Approved"
              value={totalApproved}
              valueStyle={{ color: "green" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Rejected"
              value={totalRejected}
              valueStyle={{ color: "red" }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Thống kê số đơn theo CLB">
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </Card>
    </div>
  );
};

export default ReportPage;