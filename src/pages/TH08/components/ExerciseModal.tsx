import { Modal, Form, Input, Select } from "antd";
import { useEffect } from "react";

export default function ExerciseModal({
  open,
  onCancel,
  onSubmit,
  initialValues,
}: any) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) form.resetFields();
  }, [open]);

  return (
    <Modal
      title={initialValues ? "Sửa bài tập" : "Thêm bài tập"}
      visible={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="muscle" label="Nhóm cơ">
          <Select>
            <Select.Option value="Chest">Chest</Select.Option>
            <Select.Option value="Back">Back</Select.Option>
            <Select.Option value="Legs">Legs</Select.Option>
            <Select.Option value="Shoulders">Shoulders</Select.Option>
            <Select.Option value="Arms">Arms</Select.Option>
            <Select.Option value="Core">Core</Select.Option>
            <Select.Option value="Full Body">Full Body</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="level" label="Mức độ">
          <Select>
            <Select.Option value="easy">Dễ</Select.Option>
            <Select.Option value="medium">Trung bình</Select.Option>
            <Select.Option value="hard">Khó</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="caloriesPerHour" label="Calo/giờ">
          <Input type="number" />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}