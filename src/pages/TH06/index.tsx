import { Tabs, Layout, Typography } from "antd";
import { AppProvider } from "./context/AppContext";
import HomeContent from "./Home";
import Admin from "./Admin";

const { Header, Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs; 
console.log("DEBUG - Giá trị của Admin là:", Admin);
  console.log("DEBUG - Kiểu của Admin là:", typeof Admin);
export default function TH06Index() {
  return (
    <AppProvider>
      <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
        <Header style={{ background: "#001529", padding: "0 20px" }}>
          <Title level={3} style={{ color: "white", margin: "16px 0" }}>
            Travel Planner Pro
          </Title>
        </Header>
        
        <Content style={{ padding: "0 20px" }}>
          <Tabs defaultActiveKey="1" centered size="large">
            <TabPane 
              tab={<span>🌍 Khám phá điểm đến</span>} 
              key="1"
            >
              <HomeContent />
            </TabPane>
            
            <TabPane 
              tab={<span>⚙️ Quản trị (Admin)</span>} 
              key="2"
            >
              <Admin />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </AppProvider>
  );
}