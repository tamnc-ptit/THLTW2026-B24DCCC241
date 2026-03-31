import { Modal, Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import { Member } from "../types/type";

interface Props {
  open: boolean;
  initialValues?: Member;
  onSubmit: (v: any) => void;
  onCancel: () => void;
  clubs: { id: number; name: string }[];
}

const MemberFormModal = ({
  open,
  initialValues,
  onSubmit,
  onCancel,
  clubs,
}: Props) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={open}
      title="Thành viên"
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={
          initialValues
            ? {
                ...initialValues,
                joinDate: dayjs(initialValues.joinDate),
              }
            : {}
        }
        onFinish={(values) => {
          onSubmit({
            ...values,
            joinDate: values.joinDate.format("YYYY-MM-DD"),
          });
          form.resetFields();
        }}
      >
        <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>

        <Form.Item name="phone" label="SĐT">
          <Input />
        </Form.Item>

        <Form.Item name="clubId" label="CLB" rules={[{ required: true }]}>
          <Select
            options={clubs.map(c => ({
              label: c.name,
              value: c.id,
            }))}
          />
        </Form.Item>

        <Form.Item name="role" label="Vai trò">
          <Select
            options={[
              { label: "Member", value: "member" },
              { label: "Leader", value: "leader" },
            ]}
          />
        </Form.Item>

        <Form.Item name="joinDate" label="Ngày tham gia">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MemberFormModal;