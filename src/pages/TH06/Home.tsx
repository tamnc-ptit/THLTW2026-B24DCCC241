import { Row, Col, message, Typography, Divider, Card, List, Tag, Empty, Button } from "antd";
import { useState, useMemo } from "react";
import { destinations } from "./data/destinations"; 
import { DestinationCard } from "./components/DestinationCard";
import DestinationFilter from "./components/DestinationFilter";
import { Destination } from "./types";
import { useApp, AppProvider } from "./context/AppContext";
import { DeleteOutlined, WalletOutlined, CalendarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function HomeMain() {
  const [filter, setFilter] = useState<string>();
  const { itinerary, setItinerary } = useApp();

  const safeDestinations = Array.isArray(destinations) ? destinations : [];
  const filteredData = filter 
    ? safeDestinations.filter((d) => d.type === filter) 
    : safeDestinations;

  const totalBudget = useMemo(() => {
    return itinerary.reduce((sum, item) => sum + (item.cost || 0), 0);
  }, [itinerary]);

  const handleAdd = (item: Destination) => {
    const newItem = {
      ...item,
      id: Date.now(), 
      day: 1,         
    };
    setItinerary([...itinerary, newItem]);
    message.success(`Đã thêm ${item.name} vào hành trình!`);
  };

  const handleRemove = (id: number) => {
    setItinerary(itinerary.filter(item => item.id !== id));
    message.info("Đã xóa địa điểm");
  };

  return (
    <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Row gutter={24}>
        <Col xs={24} lg={16}>
          <Card bordered={false} style={{ borderRadius: 8 }}>
            <Title level={2}>🌍 Khám phá điểm đến</Title>
            <DestinationFilter onFilter={setFilter} />
            <Divider />
            
            <Row gutter={[16, 16]}>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <Col xs={24} sm={12} key={item.id}>
                    <DestinationCard item={item} onAdd={handleAdd} />
                  </Col>
                ))
              ) : (
                <Empty description="Không tìm thấy địa điểm nào" style={{ width: '100%' }} />
              )}
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card 
            title={<span><WalletOutlined /> Ngân sách dự kiến</span>}
            bordered={false}
            style={{ marginBottom: 20, borderRadius: 8, borderLeft: '6px solid #ff4d4f' }}
          >
            <div style={{ textAlign: 'center' }}>
              <Text type="secondary">Tổng chi phí dự tính:</Text>
              <br />
              <Text strong style={{ fontSize: 32, color: '#f5222d' }}>
                {totalBudget.toLocaleString()}k
              </Text>
              <Text style={{ marginLeft: 5 }}>VNĐ</Text>
            </div>
          </Card>

         
          <Card 
            title={<span><CalendarOutlined /> Hành trình của tôi</span>}
            extra={<Tag color="blue">{itinerary.length} điểm</Tag>}
            bordered={false}
            style={{ borderRadius: 8 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={itinerary}
              locale={{ emptyText: "Chưa có địa điểm nào được chọn" }}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button 
                      type="text" 
                      danger 
                      icon={<DeleteOutlined />} 
                      onClick={() => handleRemove(item.id)} 
                    />
                  ]}
                >
                  <List.Item.Meta
                    title={<Text strong>{item.name}</Text>}
                    description={
                      <div>
                        <Tag color="cyan">Ngày {item.day}</Tag>
                        <Text type="secondary">{item.cost}k VNĐ</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
            
            {itinerary.length > 0 && (
              <Button type="primary" block size="large" style={{ marginTop: 20 }}>
                Xuất lịch trình
              </Button>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}


export default function Home() {
  return (
    <AppProvider>
      <HomeMain />
    </AppProvider>
  );
}