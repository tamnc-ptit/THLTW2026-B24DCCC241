import { Modal, Form, Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { Task, TaskFormValues, Status, Priority, STATUS, PRIORITY } from "../types/task";
import { useEffect } from "react";
const { Option } = Select;

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  initialValues?: Task | null;
}

export default function TaskForm({
  open,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const [form] = Form.useForm<TaskFormValues>();

  const isEdit = !!initialValues;

  // 🧠 set lại form khi edit
  const initialFormValues: Partial<TaskFormValues> | undefined = initialValues
    ? {
        title: initialValues.title,
        description: initialValues.description,
        status: initialValues.status,
        priority: initialValues.priority,
        tags: initialValues.tags,
        deadline: dayjs(initialValues.deadline),
      }
    : {
        status: STATUS.TODO,
        priority: PRIORITY.MEDIUM,
      };

      
  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const task: Task = {
        id: initialValues?.id || crypto.randomUUID(),

        title: values.title,
        description: values.description || "",

        status: values.status as Status,
        priority: values.priority as Priority,

        tags: values.tags || [],

        deadline: values.deadline.toISOString(),

        createdAt:
          initialValues?.createdAt || new Date().toISOString(),
      };

      onSubmit(task);
      form.resetFields();
      onClose();
    } catch (err) {
      // validate fail → không làm gì
    }
  };

  useEffect(() => {
  if (open && initialValues) {
    form.setFieldsValue({
      title: initialValues.title,
      description: initialValues.description,
      status: initialValues.status,
      priority: initialValues.priority,
      tags: initialValues.tags,
      deadline: dayjs(initialValues.deadline),
    });
  } else if (open && !initialValues) {
    form.resetFields();
    form.setFieldsValue({
      status: STATUS.TODO,
      priority: PRIORITY.MEDIUM,
    });
  }
}, [open, initialValues]);

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={isEdit ? "Edit Task" : "Add Task"}
      visible={open}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
      >
        {/* TITLE */}
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Nhập tên task" }]}
        >
          <Input />
        </Form.Item>

        {/* DESCRIPTION */}
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} />
        </Form.Item>

        {/* STATUS */}
        <Form.Item name="status" label="Status">
          <Select>
            <Option value={STATUS.TODO}>Todo</Option>
            <Option value={STATUS.IN_PROGRESS}>In Progress</Option>
            <Option value={STATUS.DONE}>Done</Option>
          </Select>
        </Form.Item>

        {/* PRIORITY */}
        <Form.Item name="priority" label="Priority">
          <Select>
            <Option value={PRIORITY.HIGH}>High</Option>
            <Option value={PRIORITY.MEDIUM}>Medium</Option>
            <Option value={PRIORITY.LOW}>Low</Option>
          </Select>
        </Form.Item>

        {/* TAGS */}
        <Form.Item name="tags" label="Tags">
          <Select mode="tags" placeholder="Nhập tag..." />
        </Form.Item>

        {/* DEADLINE */}
        <Form.Item
          name="deadline"
          label="Deadline"
          rules={[{ required: true, message: "Chọn deadline" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}