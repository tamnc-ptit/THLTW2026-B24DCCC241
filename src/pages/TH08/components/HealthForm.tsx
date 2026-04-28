import { Modal, Form, Input, DatePicker } from "antd";

export default function HealthForm({
  open,
  onCancel,
  onSubmit,
  initialValues,
}: any) {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Nhật ký sức khỏe"
      visible={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <Form.Item name="date" label="Ngày" rules={[{ required: true }]}>
          <Input placeholder="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item name="weight" label="Cân nặng (kg)">
          <Input type="number" />
        </Form.Item>

        <Form.Item name="height" label="Chiều cao (cm)">
          <Input type="number" />
        </Form.Item>

        <Form.Item name="heartRate" label="Nhịp tim (bpm)">
          <Input type="number" />
        </Form.Item>

        <Form.Item name="sleep" label="Giờ ngủ">
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
}