import { Card, Form, Input, Button, Select, DatePicker, message } from "antd";

import type { Club,Application } from "../types/type";


interface Props {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
}

// mock CLB
const mockClubs: Club[] = [
  { id: 1, name: "CLB IT", avatar: "", foundedDate: "", descriptionHtml: "", president: "", isActive: true },
  { id: 2, name: "CLB Bóng đá", avatar: "", foundedDate: "", descriptionHtml: "", president: "", isActive: true },
];

const ApplicationPage = ({ applications, setApplications }: Props) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const newApplication: Application = {
      id: Date.now(),
      name: values.name,
      email: values.email,
      phone: values.phone,
      clubId: values.clubId,
      joinDate: values.joinDate.format("YYYY-MM-DD"),

      status: "pending", 
      createdAt: new Date().toISOString(),
    };

    setApplications(prev => [...prev, newApplication]);

    message.success("Đăng ký thành công, chờ duyệt!");
    form.resetFields();
  };

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <Card title="Đăng ký tham gia CLB">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Họ tên"
            rules={[{ required: true, message: "Nhập tên" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Nhập email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="phone" label="SĐT">
            <Input />
          </Form.Item>

          <Form.Item
            name="clubId"
            label="Chọn CLB"
            rules={[{ required: true, message: "Chọn CLB" }]}
          >
            <Select
              options={mockClubs.map(c => ({
                label: c.name,
                value: c.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            name="joinDate"
            label="Ngày tham gia"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Đăng ký
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ApplicationPage;