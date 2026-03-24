import { Form, Input, InputNumber, DatePicker, Button, Table, message } from "antd";
import { useState } from "react";
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

interface QuyetDinh {
  id: number;
  soQuyetDinh: string;
  ngayBanHanh: string;
  trichYeu: string;
  soVanBangId: number;
  luotTraCuu: number;
}

interface Props {
  vanBangs: VanBang[];
  quyetDinhs: QuyetDinh[];
  setQuyetDinhs: React.Dispatch<React.SetStateAction<QuyetDinh[]>>;
}
const TraCuu: React.FC<Props> = ({
  vanBangs,
  quyetDinhs,
  setQuyetDinhs,
}) => {
  const [form] = Form.useForm();
  const [result, setResult] = useState<VanBang[]>([]);

  const handleSearch = (values: any) => {
    const filledFields = Object.values(values).filter(
      (v) => v !== undefined && v !== ""
    );

    if (filledFields.length < 2) {
      message.error("Nhập ít nhất 2 điều kiện!");
      return;
    }

    const filtered = vanBangs.filter((vb) => {
      return (
        (!values.soHieu || vb.soHieu.includes(values.soHieu)) &&
        (!values.soVaoSo || vb.soVaoSo === values.soVaoSo) &&
        (!values.maSinhVien || vb.maSinhVien.includes(values.maSinhVien)) &&
        (!values.hoTen || vb.hoTen.toLowerCase().includes(values.hoTen.toLowerCase())) &&
        (!values.ngaySinh ||
          vb.ngaySinh === values.ngaySinh.format("YYYY-MM-DD"))
      );
    });

    setResult(filtered);
  };

  const handleView = (record: VanBang) => {
    setQuyetDinhs((prev) =>
      prev.map((q) =>
        q.id === record.quyetDinhId
          ? { ...q, luotTraCuu: q.luotTraCuu + 1 }
          : q
      )
    );

    message.success("Đã ghi nhận lượt tra cứu!");
  };

  const columns = [
    { title: "Số vào sổ", dataIndex: "soVaoSo" },
    { title: "Số hiệu", dataIndex: "soHieu" },
    { title: "Họ tên", dataIndex: "hoTen" },
    {
      title: "Hành động",
      render: (_: any, record: VanBang) => (
        <Button onClick={() => handleView(record)}>Xem</Button>
      ),
    },
  ];

  return (
    <>
      <h2>Tra cứu văn bằng</h2>

      <Form form={form} layout="inline" onFinish={handleSearch}>
        <Form.Item name="soHieu">
          <Input placeholder="Số hiệu" />
        </Form.Item>

        <Form.Item name="soVaoSo">
          <InputNumber placeholder="Số vào sổ" />
        </Form.Item>

        <Form.Item name="maSinhVien">
          <Input placeholder="Mã SV" />
        </Form.Item>

        <Form.Item name="hoTen">
          <Input placeholder="Họ tên" />
        </Form.Item>

        <Form.Item name="ngaySinh">
          <DatePicker />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Tìm kiếm
        </Button>
      </Form>

      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={result}
        rowKey="id"
      />
    </>
  );
};

export default TraCuu;