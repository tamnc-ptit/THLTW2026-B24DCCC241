import { useState } from 'react';
import { Form, Input, Button, Table, InputNumber, Popconfirm } from 'antd';

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
}

const ServicePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form] = Form.useForm();

  const saveService = (values: any) => {
    if (editingId) {
      const updated = services.map((s) =>
        s.id === editingId ? { ...s, ...values } : s
      );
      setServices(updated);
      setEditingId(null);
    } else {
      const newService: Service = {
        id: Date.now(),
        name: values.name,
        price: values.price,
        duration: values.duration,
      };
      setServices([...services, newService]);
    }

    form.resetFields();
  };

  const editService = (record: Service) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
  };

  const deleteService = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const columns = [
    {
      title: 'Tên dịch vụ',
      dataIndex: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
    },
    {
      title: 'Thời gian (phút)',
      dataIndex: 'duration',
    },
    {
      title: 'Hành động',
      render: (record: Service) => (
        <>
          <Button type="link" onClick={() => editService(record)}>
            Sửa
          </Button>

          <Popconfirm
            title="Xóa dịch vụ?"
            onConfirm={() => deleteService(record.id)}
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
    <div>
      <h2>Quản Lý Dịch Vụ</h2>

      <Form form={form} layout="vertical" onFinish={saveService}>
        <Form.Item name="name" label="Tên dịch vụ" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Thời gian (phút)"
          rules={[{ required: true }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          {editingId ? 'Cập nhật' : 'Thêm dịch vụ'}
        </Button>
      </Form>

      <Table
        dataSource={services}
        columns={columns}
        rowKey="id"
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default ServicePage;