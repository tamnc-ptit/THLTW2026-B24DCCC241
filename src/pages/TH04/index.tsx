import React, { useState } from "react";
import { Layout, Menu } from "antd";

import SoVanBang from "./SoVanBang";
import QuyetDinh from "./QuyetDinh";
import VanBang from "./VanBang";
import TraCuu from "./TraCuu";

const { Sider, Content } = Layout;

// ===== TYPES =====
interface SoVanBang {
  id: number;
  nam: number;
  soHienTai: number;
}

interface QuyetDinh {
  id: number;
  soQuyetDinh: string;
  ngayBanHanh: string;
  trichYeu: string;
  soVanBangId: number;
  luotTraCuu: number;
}

interface FieldConfig {
  id: number;
  name: string;
  type: "string" | "number" | "date";
}

interface VanBang {
  id: number;
  soVaoSo: number;
  soHieu: string;
  maSinhVien: string;
  hoTen: string;
  ngaySinh: string;
  quyetDinhId: number;
  extraFields: Record<string, any>;
}

const TH04: React.FC = () => {
  const [page, setPage] = useState("SoVanBang");

  const [soVanBangs, setSoVanBangs] = useState<SoVanBang[]>([]);
  const [quyetDinhs, setQuyetDinhs] = useState<QuyetDinh[]>([]);
  const [vanBangs, setVanBangs] = useState<VanBang[]>([]);
  const [fields, setFields] = useState<FieldConfig[]>([]);
  const [selectedSoId, setSelectedSoId] = useState<number | null>(null);

  const tangSo = () => {
    if (!selectedSoId) return;

    let current = 0;

    setSoVanBangs((prev) =>
      prev.map((s) => {
        if (s.id === selectedSoId) {
          current = s.soHienTai + 1;
          return { ...s, soHienTai: current };
        }
        return s;
      })
    );

    return current;
  };

  const renderPage = () => {
    switch (page) {
      case "SoVanBang":
        return (
          <SoVanBang
            soVanBangs={soVanBangs}
            setSoVanBangs={setSoVanBangs}
            selectedSoId={selectedSoId}
            setSelectedSoId={setSelectedSoId}
          />
        );

      case "QuyetDinh":
        return (
          <QuyetDinh
            selectedSoId={selectedSoId}
            quyetDinhs={quyetDinhs}
            setQuyetDinhs={setQuyetDinhs}
          />
        );

      case "VanBang":
        return (
          <VanBang
            selectedSoId={selectedSoId}
            quyetDinhs={quyetDinhs}
            vanBangs={vanBangs}
            setVanBangs={setVanBangs}
            fields={fields}
            setFields={setFields}
            tangSo={tangSo}
          />
        );
        case "TraCuu":
  return (
    <TraCuu
      vanBangs={vanBangs}
      quyetDinhs={quyetDinhs}
      setQuyetDinhs={setQuyetDinhs}
    />
  );

      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[page]}
          onClick={(e) => setPage(e.key)}
          items={[
            { key: "SoVanBang", label: "Sổ văn bằng" },
            { key: "QuyetDinh", label: "Quyết định" },
            { key: "VanBang", label: "Văn bằng" },
            { key: "TraCuu", label: "Tra cứu" }
          ]}
        />
      </Sider>

      <Layout>
        <Content style={{ padding: 20 }}>
          <h2>Hệ thống quản lý văn bằng</h2>

          <p>
            Sổ đang chọn:{" "}
            <b>
              {soVanBangs.find((s) => s.id === selectedSoId)?.nam ||
                "Chưa chọn"}
            </b>
          </p>

          {renderPage()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default TH04;