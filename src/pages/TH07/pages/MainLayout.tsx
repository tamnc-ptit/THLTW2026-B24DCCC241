import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Sider, Content } = Layout;

export default function MainLayout({ children }: any) {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <Sider>
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255,255,255,0.3)",
            color: "#fff",
            textAlign: "center",
            lineHeight: "32px",
          }}
        >
          BLOG
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item key="/admin/posts">
            <Link to="/admin/posts">Posts</Link>
          </Menu.Item>

          <Menu.Item key="/admin/tags">
            <Link to="/admin/tags">Tags</Link>
          </Menu.Item>

          <Menu.Item key="/about">
            <Link to="/about">About</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* CONTENT */}
      <Layout>
        <Content style={{ margin: 16, padding: 20, background: "#fff" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}