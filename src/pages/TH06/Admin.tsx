import { useState, useMemo } from "react";
import { Table, Button, Modal, Card, Row, Col, Statistic, Typography, Tag, Popconfirm } from "antd";
import { PlusOutlined, DeleteOutlined, PieChartOutlined, DollarOutlined, BarChartOutlined } from "@ant-design/icons";
import { destinations as init } from "./data/destinations";

import DestinationFormRaw from "./components/DestinationForm";

const DestinationForm: any = (DestinationFormRaw as any).default || DestinationFormRaw;

const { Title } = Typography;

export default function Admin() {
  const [data, setData] = useState(init);
  const [visible, setVisible] = useState(false);

  const stats = useMemo(() => {
    const totalCount = data.length;
    const totalCost = data.reduce((sum, item) => sum + (Number(item.cost) || 0), 0);
    const avgCost = totalCount ? (totalCost / totalCount).toFixed(0) : 0;
    
    return { totalCount, avgCost };
  }, [data]);

  const handleAdd = (values: any) => {
    const newItem = { 
      ...values, 
      id: Date.now(), 
      rating: 5,
      image: values.image || "https://picsum.photos/400/300" 
    };
    setData([newItem, ...data]);
    setVisible(false);
  };

  const columns = [
    {
      title: "Tên điểm đến",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <b style={{ color: '#1890ff' }}>{text}</b>,
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag color={type === 'beach' ? 'blue' : 'green'}>
          {(type || 'khác').toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Chi phí (k)",
      dataIndex: "cost",
      key: "cost",
      sorter: (a: any, b: any) => a.cost - b.cost,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Xóa địa điểm này?"
          onConfirm={() => setData(data.filter((item) => item.id !== record.id))}
          okText="Có"
          cancelText="Không"
        >
          <Button type="text" danger icon={<DeleteOutlined />}>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "80vh" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <Title level={3}>⚙️ QUẢN TRỊ HỆ THỐNG</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => setVisible(true)}
        >
          Thêm địa điểm
        </Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic title="Tổng địa điểm" value={stats.totalCount} prefix={<PieChartOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic title="Chi phí TB" value={stats.avgCost} suffix="k" prefix={<DollarOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic title="Lượt truy cập" value={1024} prefix={<BarChartOutlined />} valueStyle={{ color: '#cf1322' }} />
          </Card>
        </Col>
      </Row>

      <Card bordered={false} title="Danh sách dữ liệu">
        <Table 
          columns={columns} 
          dataSource={data} 
          rowKey="id" 
          pagination={{ pageSize: 5 }}
          scroll={{ x: 600 }}
        />
      </Card>

      <Modal
        title="Thêm địa điểm mới"
        visible={visible} 
        onCancel={() => setVisible(false)}
        footer={null}
        destroyOnClose
      >
        <DestinationForm onSubmit={handleAdd} />
      </Modal>
    </div>
  );
}