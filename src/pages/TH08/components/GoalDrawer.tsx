import { Drawer, Form, Input, Select, DatePicker } from "antd";

export default function GoalDrawer({ open, onClose, onSubmit }: any) {
  const [form] = Form.useForm();

  return (
    <Drawer
  visible={open}
  onClose={onClose}
  afterVisibleChange={(visible) => {
    if (!visible) {
      form.resetFields();
    }
  }}
>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item name="name" label="Tên mục tiêu" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="type" label="Loại">
          <Select>
            <Select.Option value="Giảm cân">Giảm cân</Select.Option>
            <Select.Option value="Tăng cơ">Tăng cơ</Select.Option>
            <Select.Option value="Sức bền">Sức bền</Select.Option>
            <Select.Option value="Khác">Khác</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="target" label="Giá trị mục tiêu">
          <Input type="number" />
        </Form.Item>

        <Form.Item name="current" label="Giá trị hiện tại">
          <Input type="number" />
        </Form.Item>

        <Form.Item name="deadline" label="Deadline">
          <Input placeholder="YYYY-MM-DD" />
        </Form.Item>
      </Form>
    </Drawer>
  );
}