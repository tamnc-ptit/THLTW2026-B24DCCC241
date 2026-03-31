import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  TeamOutlined,
  FormOutlined,
  UserOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

import type { Club , Application } from "./types/type";

import ClubPage from "./pages/ClubPage";
import ApplicationPage from "./pages/ApplicationPage";
import ApplicationManagement from "./pages/ApplicationManagement";
import MemberPage from "./pages/MemberPage";
import ReportPage from "./pages/ReportPage";

const { Sider, Content } = Layout;

const mockClubs: Club[] = [
  {
    id: 1,
    name: "CLB IT",
    avatar: "/avatar_TH05.jpg",
    foundedDate: "2020-01-01",
    descriptionHtml: "<p>CLB công nghệ</p>",
    president: "Nguyễn Văn A",
    isActive: true,
  },
  {
    id: 2,
    name: "CLB Badminton",
    avatar: "/mat_cu.jpg",
    foundedDate: "2021-01-01",
    descriptionHtml: "<p>CLB thể thao </p>",
    president: "Nguyễn Chí Tâm",
    isActive: true,
  },
];

const TH05 = () => {

  const [applications, setApplications] = useState<Application[]>([]);
  const [clubs, setClubs] = useState<Club[]>(mockClubs);

  const [currentPage, setCurrentPage] = useState<string>("club");
  const renderPage = () => {
    switch (currentPage) {
      case "club":
        return <ClubPage clubs={clubs} setClubs={setClubs} />;

      case "application":
        return (
          <ApplicationPage
            applications={applications}
            setApplications={setApplications}
          />
        );

      case "application-manage":
        return (
          <ApplicationManagement
            applications={applications}
            setApplications={setApplications}
          />
        );

      case "member":
        return (
          <MemberPage
            applications={applications}
            setApplications={setApplications}
          />
        );

      case "report":
        return <ReportPage applications={applications} clubs={clubs} />;

      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div style={{ color: "white", padding: 16, fontWeight: "bold" }}>
          CLUB SYSTEM
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentPage]}
          onClick={(e) => setCurrentPage(e.key)}
          items={[
            { key: "club", icon: <TeamOutlined />, label: "Câu lạc bộ" },
            { key: "application", icon: <FormOutlined />, label: "Đăng ký" },
            {
              key: "application-manage",
              icon: <FormOutlined />,
              label: "Quản lý đơn",
            },
            { key: "member", icon: <UserOutlined />, label: "Thành viên" },
            { key: "report", icon: <BarChartOutlined />, label: "Thống kê" },
          ]}
        />
      </Sider>

      <Layout>
        <Content style={{ padding: 20 }}>{renderPage()}</Content>
      </Layout>
    </Layout>
  );
};

export default TH05;