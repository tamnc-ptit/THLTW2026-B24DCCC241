import {
  Form,
  Input,
  DatePicker,
  InputNumber,
  Button,
  Select,
  Table,
  message,
} from "antd";

interface FieldConfig {
  id: number;
  name: string;
  type: "string" | "number" | "date";
}

interface QuyetDinhType {
  id: number;
  soQuyetDinh: string;
  soVanBangId: number;
}

interface VanBangType {
  id: number;
  soVaoSo: number;
  soHieu: string;
  maSinhVien: string;
  hoTen: string;
  ngaySinh: string;
  quyetDinhId: number;
  extraFields: Record<string, any>;
}

interface Props {
  selectedSoId: number | null;
  quyetDinhs: QuyetDinhType[];
  vanBangs: VanBangType[];
  setVanBangs: React.Dispatch<React.SetStateAction<VanBangType[]>>;
  fields: FieldConfig[];
  setFields: React.Dispatch<React.SetStateAction<FieldConfig[]>>;
  tangSo: () => number | undefined;
}

const VanBang: React.FC<Props> = ({
  selectedSoId,
  quyetDinhs,
  vanBangs,
  setVanBangs,
  fields,
  setFields,
  tangSo,
}) => {
  const [formField] = Form.useForm();
  const [formVB] = Form.useForm();

  const addField = (values: any) => {
    const newField: FieldConfig = {
      id: Date.now(),
      name: values.name,
      type: values.type,
    };

    setFields([...fields, newField]);
    formField.resetFields();
  };

  const addVanBang = (values: any) => {
    if (!selectedSoId) {
      message.error("Phải chọn sổ trước!");
      return;
    }

    const soVaoSo = tangSo();
    if (!soVaoSo) return;

    const extra: Record<string, any> = {};
    fields.forEach((f) => {
      extra[f.name] =
        f.type === "date"
          ? values[f.name]?.format("YYYY-MM-DD")
          : values[f.name];
    });

    const newVB: VanBangType = {
      id: Date.now(),
      soVaoSo,
      soHieu: values.soHieu,
      maSinhVien: values.maSinhVien,
      hoTen: values.hoTen,
      ngaySinh: values.ngaySinh.format("YYYY-MM-DD"),
      quyetDinhId: values.quyetDinhId,
      extraFields: extra,
    };

    setVanBangs([...vanBangs, newVB]);
    formVB.resetFields();
  };

  const filteredQD = quyetDinhs.filter(
    (q) => q.soVanBangId === selectedSoId
  );

  const columns: any[] = [
    { title: "Số vào sổ", dataIndex: "soVaoSo" },
    { title: "Số hiệu", dataIndex: "soHieu" },
    { title: "Họ tên", dataIndex: "hoTen" },
    {
      title: "Quyết định",
      render: (_: any, record: VanBangType) => {
        const qd = quyetDinhs.find(
          (q) => q.id === record.quyetDinhId
        );
        return qd?.soQuyetDinh;
      },
    },

    ...fields.map((f) => ({
      title: f.name,
      render: (_: any, record: VanBangType) =>
        record.extraFields[f.name] || "",
    })),
  ];

  return (
    <>
      <h2>Quản lý Văn bằng</h2>

      <h3>Cấu hình field</h3>
      <Form layout="inline" form={formField} onFinish={addField}>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Tên field (vd: Dân tộc)" />
        </Form.Item>

        <Form.Item name="type" rules={[{ required: true }]}>
          <Select style={{ width: 150 }}>
            <Select.Option value="string">String</Select.Option>
            <Select.Option value="number">Number</Select.Option>
            <Select.Option value="date">Date</Select.Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Thêm field
        </Button>
      </Form>

      <h3 style={{ marginTop: 30 }}>Thêm văn bằng</h3>

      <Form form={formVB} layout="vertical" onFinish={addVanBang}>
        <Form.Item name="soHieu" label="Số hiệu" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="maSinhVien" label="Mã SV">
          <Input />
        </Form.Item>

        <Form.Item name="hoTen" label="Họ tên" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="ngaySinh" label="Ngày sinh">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="quyetDinhId"
          label="Quyết định"
          rules={[{ required: true }]}
        >
          <Select placeholder="Chọn quyết định">
            {filteredQD.map((q) => (
              <Select.Option key={q.id} value={q.id}>
                {q.soQuyetDinh}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {fields.map((field) => {
          switch (field.type) {
            case "string":
              return (
                <Form.Item key={field.id} name={field.name} label={field.name}>
                  <Input />
                </Form.Item>
              );

            case "number":
              return (
                <Form.Item key={field.id} name={field.name} label={field.name}>
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              );

            case "date":
              return (
                <Form.Item key={field.id} name={field.name} label={field.name}>
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              );

            default:
              return null;
          }
        })}

        <Button type="primary" htmlType="submit">
          Thêm văn bằng
        </Button>
      </Form>

      <Table
        style={{ marginTop: 30 }}
        columns={columns}
        dataSource={vanBangs}
        rowKey="id"
      />
    </>
  );
};

export default VanBang;