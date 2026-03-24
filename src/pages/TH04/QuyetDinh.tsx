import { Form, Input, DatePicker, Button, Table, message } from "antd";

interface QuyetDinhType {
  id: number;
  soQuyetDinh: string;
  ngayBanHanh: string;
  trichYeu: string;
  soVanBangId: number;
  luotTraCuu: number;
}

interface Props {
  selectedSoId: number | null;
  quyetDinhs: QuyetDinhType[];
  setQuyetDinhs: React.Dispatch<React.SetStateAction<QuyetDinhType[]>>;
}

const QuyetDinh: React.FC<Props> = ({
  selectedSoId,
  quyetDinhs,
  setQuyetDinhs,
}) => {
  const [form] = Form.useForm();

  const addQuyetDinh = (values: any) => {
    if (!selectedSoId) {
      message.error("Phải chọn sổ văn bằng trước!");
      return;
    }

    const newQD: QuyetDinhType = {
      id: Date.now(),
      soQuyetDinh: values.soQuyetDinh,
      ngayBanHanh: values.ngayBanHanh.format("YYYY-MM-DD"),
      trichYeu: values.trichYeu,
      soVanBangId: selectedSoId,
      luotTraCuu: 0,
    };

    setQuyetDinhs([...quyetDinhs, newQD]);
    form.resetFields();
  };

  const filteredQD = quyetDinhs.filter(
    (q) => q.soVanBangId === selectedSoId
  );

  const columns = [
    {
      title: "Số QĐ",
      dataIndex: "soQuyetDinh",
    },
    {
      title: "Ngày ban hành",
      dataIndex: "ngayBanHanh",
    },
    {
      title: "Trích yếu",
      dataIndex: "trichYeu",
    },
    {
      title: "Lượt tra cứu",
      dataIndex: "luotTraCuu",
    },
  ];

  return (
    <>
      <h2>Quản lý Quyết định</h2>

      <Form form={form} layout="inline" onFinish={addQuyetDinh}>
        <Form.Item
          name="soQuyetDinh"
          label="Số QĐ"
          rules={[{ required: true, message: "Nhập số QĐ" }]}
        >
          <Input placeholder="VD: QD-001" />
        </Form.Item>

        <Form.Item
          name="ngayBanHanh"
          label="Ngày"
          rules={[{ required: true, message: "Chọn ngày" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="trichYeu"
          label="Trích yếu"
          rules={[{ required: true, message: "Nhập nội dung" }]}
        >
          <Input placeholder="Nội dung..." />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </Form>

      <h3 style={{ marginTop: 10 }}>
        {selectedSoId
          ? "Danh sách quyết định của sổ đã chọn"
          : "Chưa chọn sổ"}
      </h3>

      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={filteredQD}
        rowKey="id"
      />
    </>
  );
};

export default QuyetDinh;