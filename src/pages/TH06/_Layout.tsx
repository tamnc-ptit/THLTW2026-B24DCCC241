import { Layout, Menu } from "antd";
import { Link } from "umi";
import { AppProvider } from "./context/AppContext";

const { Header, Content } = Layout;

export default function TH06Layout(props: any) {
  return (
    <AppProvider>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1"><Link to="/TH06">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/TH06/itinerary">Itinerary</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/TH06/budget">Budget</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/TH06/admin">Admin</Link></Menu.Item>
          </Menu>
        </Header>

        <Content style={{ padding: 20 }}>
          {props.children}
        </Content>
      </Layout>
    </AppProvider>
  );
}