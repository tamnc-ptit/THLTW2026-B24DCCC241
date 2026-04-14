import { Modal, Form, Input, Select, InputNumber } from "antd";
import { Course, Instructor } from "../types";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onCancel: () => void;
  onSave: (values: any) => void;
  editing: Course | null;
  instructors: Instructor[];
};

export default function CourseModal({
  open,
  onCancel,
  onSave,
  editing,
  instructors,
}: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (editing) {
        form.setFieldsValue(editing);
      } else {
        form.resetFields();
        form.setFieldsValue({
          status: "OPEN",
          student_count: 0,
        });
      }
    }
  }, [open, editing]);

  return (
    <Modal
      title={editing ? "Sửa khóa học" : "Thêm khóa học"}
      visible={open}
      onOk={() => form.validateFields().then(onSave)}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên khóa học"
          rules={[
            { required: true, message: "Không được để trống" },
            { max: 100, message: "Tối đa 100 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="instructor_id"
          label="Giảng viên"
          rules={[{ required: true, message: "Phải chọn giảng viên" }]}
        >
          <Select
            placeholder="Chọn giảng viên"
            options={instructors.map((i) => ({
              label: i.name,
              value: i.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="student_count"
          label="Số học viên"
          rules={[
            { required: true, message: "Không được để trống" },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả (HTML)"
          rules={[{ required: true, message: "Không được để trống" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { label: "Đang mở", value: "OPEN" },
              { label: "Đã kết thúc", value: "CLOSED" },
              { label: "Tạm dừng", value: "PAUSED" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}