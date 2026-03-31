import { Modal, Form, Input, DatePicker, Switch } from "antd";
import dayjs from "dayjs";
import type { ClubFormModalProps } from "../types/type";

const ClubFormModal = ({
  open,
  initialValues,
  onSubmit,
  onCancel,
}: ClubFormModalProps) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={initialValues ? "Chỉnh sửa CLB" : "Thêm CLB"}
      visible={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={
          initialValues
            ? {
                ...initialValues,
                foundedDate: dayjs(initialValues.foundedDate),
              }
            : {
                isActive: true,
              }
        }
        onFinish={(values) => {
          onSubmit({
            ...values,
            foundedDate: values.foundedDate.format("YYYY-MM-DD"),
          });
          form.resetFields();
        }}
      >
        <Form.Item
          name="name"
          label="Tên CLB"
          rules={[{ required: true, message: "Nhập tên CLB" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="president" label="Chủ nhiệm">
          <Input />
        </Form.Item>

        <Form.Item
          name="foundedDate"
          label="Ngày thành lập"
          rules={[{ required: true, message: "Chọn ngày" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="descriptionHtml" label="Mô tả">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="isActive"
          label="Hoạt động"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ClubFormModal;