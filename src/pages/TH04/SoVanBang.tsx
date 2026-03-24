import { Form, InputNumber, Button, Table, message } from "antd";

interface SoVanBangType {
  id: number;
  nam: number;
  soHienTai: number;
}

interface Props {
  soVanBangs: SoVanBangType[];
  setSoVanBangs: React.Dispatch<React.SetStateAction<SoVanBangType[]>>;
  selectedSoId: number | null;
  setSelectedSoId: (id: number) => void;
}

const SoVanBang: React.FC<Props> = ({
  soVanBangs,
  setSoVanBangs,
  selectedSoId,
  setSelectedSoId,
}) => {
  const [form] = Form.useForm();

  const addSoMoi = (values: any) => {
    const nam = values.nam;

    if (soVanBangs.some((s) => s.nam === nam)) {
      message.error("Năm đã tồn tại!");
      return;
    }

    const newSo: SoVanBangType = {
      id: Date.now(),
      nam,
      soHienTai: 0,
    };

    setSoVanBangs([...soVanBangs, newSo]);
    form.resetFields();
  };

  const handleSelectSo = (id: number) => {
    setSelectedSoId(id);
  };

  const columns = [
    {
      title: "Năm",
      dataIndex: "nam",
    },
    {
      title: "Số hiện tại",
      dataIndex: "soHienTai",
    },
  ];

  return (
    <>
      <h2>Quản lý Sổ Văn Bằng</h2>

      <Form form={form} layout="inline" onFinish={addSoMoi}>
        <Form.Item
          name="nam"
          label="Năm"
          rules={[{ required: true, message: "Nhập năm" }]}
        >
          <InputNumber min={1900} max={2100} placeholder="Nhập năm" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Thêm sổ
        </Button>
      </Form>

      <h3 style={{ marginTop: 10 }}>
        Đang chọn:{" "}
        {soVanBangs.find((s) => s.id === selectedSoId)?.nam ||
          "Chưa chọn"}
      </h3>

      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={soVanBangs}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleSelectSo(record.id),
        })}
        rowClassName={(record) =>
          record.id === selectedSoId ? "selected-row" : ""
        }
      />

      <style>
        {`
          .selected-row {
            background-color: #e6f7ff !important;
          }
        `}
      </style>
    </>
  );
};

export default SoVanBang;