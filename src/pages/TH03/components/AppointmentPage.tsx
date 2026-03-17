import { useState } from "react";
import { Form, Input, Select, DatePicker, TimePicker, Button, Table, Popconfirm } from "antd";
import dayjs from "dayjs";

interface Appointment {
  id: number;
  customer: string;
  employee: string;
  service: string;
  date: string;
  time: string;
  status: string;
}

const AppointmentPage: React.FC = () => {

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form] = Form.useForm();

  const employees = ["Anh", "Bình", "Chi"];
  const services = ["Cắt tóc", "Gội đầu", "Massage"];
  const statusList = ["Chờ duyệt", "Xác nhận", "Hoàn thành", "Hủy"];

  const saveAppointment = (values: any) => {

    const date = values.date.format("YYYY-MM-DD");
    const time = values.time.format("HH:mm");

    // kiểm tra trùng lịch
    const isDuplicate = appointments.some(
      (a) =>
        a.employee === values.employee &&
        a.date === date &&
        a.time === time &&
        a.id !== editingId
    );

    if (isDuplicate) {
      alert("Nhân viên này đã có lịch vào thời gian này!");
      return;
    }

    const data = {
      customer: values.customer,
      employee: values.employee,
      service: values.service,
      date,
      time,
      status: values.status || "Chờ duyệt",
    };

    if (editingId) {
      const updated = appointments.map((a) =>
        a.id === editingId ? { ...a, ...data } : a
      );

      setAppointments(updated);
      setEditingId(null);
    } else {
      setAppointments([
        ...appointments,
        {
          id: Date.now(),
          ...data,
        },
      ]);
    }

    form.resetFields();
  };

  const editAppointment = (record: Appointment) => {
    setEditingId(record.id);

    form.setFieldsValue({
      customer: record.customer,
      employee: record.employee,
      service: record.service,
      date: dayjs(record.date),
      time: dayjs(record.time, "HH:mm"),
      status: record.status,
    });
  };

  const deleteAppointment = (id: number) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "customer",
    },
    {
      title: "Nhân viên",
      dataIndex: "employee",
    },
    {
      title: "Dịch vụ",
      dataIndex: "service",
    },
    {
      title: "Ngày",
      dataIndex: "date",
    },
    {
      title: "Giờ",
      dataIndex: "time",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Hành động",
      render: (record: Appointment) => (
        <>
          <Button type="link" onClick={() => editAppointment(record)}>
            Sửa
          </Button>

          <Popconfirm
            title="Xóa lịch hẹn?"
            onConfirm={() => deleteAppointment(record.id)}
          >
            <Button danger type="link">
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 700, margin: "auto" }}>
      <h2>Quản Lý Lịch Hẹn</h2>

      <Form form={form} layout="vertical" onFinish={saveAppointment}>

        <Form.Item
          name="customer"
          label="Tên khách hàng"
          rules={[{ required: true, message: "Nhập tên khách hàng" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="employee"
          label="Nhân viên"
          rules={[{ required: true }]}
        >
          <Select
            options={employees.map((e) => ({
              value: e,
              label: e,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="service"
          label="Dịch vụ"
          rules={[{ required: true }]}
        >
          <Select
            options={services.map((s) => ({
              value: s,
              label: s,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="date"
          label="Ngày"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="time"
          label="Giờ"
          rules={[{ required: true }]}
        >
          <TimePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="status" label="Trạng thái">
          <Select
            options={statusList.map((s) => ({
              value: s,
              label: s,
            }))}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          {editingId ? "Cập nhật" : "Thêm lịch hẹn"}
        </Button>

      </Form>

      <Table
        style={{ marginTop: 30 }}
        dataSource={appointments}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};

export default AppointmentPage;