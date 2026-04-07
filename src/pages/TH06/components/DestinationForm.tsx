
import { Form, Input, InputNumber, Button, Row, Col, Select } from "antd";

const { Option } = Select;

interface Props {
  onSubmit: (values: any) => void;
}

export default function DestinationForm({ onSubmit }: Props) {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    // Truyền dữ liệu ngược lại cho Admin.tsx xử lý
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form 
      form={form} 
      layout="vertical" 
      onFinish={handleFinish}
      initialValues={{ type: 'beach', rating: 5 }}
    >
      <Form.Item 
        name="name" 
        label="Tên địa điểm" 
        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
      >
        <Input placeholder="Ví dụ: Bãi Sao, Phú Quốc" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="type" label="Loại hình">
            <Select>
              <Option value="beach">Biển đảo (Beach)</Option>
              <Option value="mountain">Núi cao (Mountain)</Option>
              <Option value="city">Thành phố (City)</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cost" label="Tổng chi phí dự kiến (k)">
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="eatPrice" label="Ăn uống (k)">
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="stayPrice" label="Lưu trú (k)">
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="movePrice" label="Di chuyển (k)">
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="image" label="Link ảnh (URL)">
        <Input placeholder="https://..." />
      </Form.Item>

      <Form.Item name="description" label="Mô tả ngắn">
        <Input.TextArea rows={3} placeholder="Nhập mô tả về địa điểm..." />
      </Form.Item>

      <Button type="primary" htmlType="submit" block size="large" style={{ marginTop: 10 }}>
        Lưu địa điểm
      </Button>
    </Form>
  );
}