import { Modal, Form, Input, Select } from "antd";

export default ({ visible, onCancel, onSubmit, initialValues }: any) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      title="Workout"
    >
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <Form.Item name="date" label="Ngày">
          <Input />
        </Form.Item>

        <Form.Item name="type" label="Loại">
          <Select>
            <Select.Option value="Cardio">Cardio</Select.Option>
            <Select.Option value="Strength">Strength</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="duration" label="Thời lượng">
          <Input />
        </Form.Item>

        <Form.Item name="calories" label="Calo">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};