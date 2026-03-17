import { useState } from 'react';
import { Form, Input, InputNumber, Button, Table, Select, TimePicker } from 'antd';
interface employee {
	id: number;
	name: string;
	maxCustomers: number;
	schedule: workingSchedule;
}

interface workingSchedule {
	day: string;
	startTime: string;
	endTime: string;
}

const EmployeePage: React.FC = () => {
	const [employee, setEmployee] = useState<employee[]>([]);
	const [form] = Form.useForm();
	const [editingId, setEditingId] = useState<number | null>(null);

	const addEmployee = (values: any) => {
		const data = {
			name: values.name,
			maxCustomers: values.maxCustomers,
			schedule: {
				day: values.day,
				startTime: values.start.format('HH:mm'),
				endTime: values.end.format('HH:mm'),
			},
		};

		if (editingId) {
			const updated = employee.map((emp) => (emp.id === editingId ? { ...emp, ...data } : emp));

			setEmployee(updated);
			setEditingId(null);
		} else {
			const newEmployee: employee = {
				id: Date.now(),
				...data,
			};

			setEmployee([...employee, newEmployee]);
		}

		form.resetFields();
	};
	const deleteEmployee = (id: number) => {
		const filtered = employee.filter((emp) => emp.id !== id);
		setEmployee(filtered);
	};

	const editEmployee = (record: employee) => {
		setEditingId(record.id);

		form.setFieldsValue({
			name: record.name,
			maxCustomers: record.maxCustomers,
			day: record.schedule.day,
		});
	};
	const columns = [
		{
			title: 'Tên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Lịch làm việc',
			render: (record: employee) => (
				<>
					{record.schedule.day} {record.schedule.startTime} - {record.schedule.endTime}
				</>
			),
		},
		{
			title: 'Giới hạn khách',
			dataIndex: 'maxCustomers',
		},
		{
			title: 'Hành động',
			render: (record: employee) => (
				<>
					<Button type='link' onClick={() => editEmployee(record)}>
						Sửa
					</Button>

					<Button type='link' danger onClick={() => deleteEmployee(record.id)}>
						Xóa
					</Button>
				</>
			),
		},
	];
	return (
		<div>
			<h2>Quan Ly Nhan Vien</h2>
			<Form form={form} layout='vertical' onFinish={addEmployee}>
				<Form.Item label='Ten Nhan Vien' name='name' rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item label='Gioi han khach' name='maxCustomers' rules={[{ required: true }]}>
					<InputNumber />
				</Form.Item>
				<Form.Item label='Lich lam viec' name='day' rules={[{ required: true }]}>
					<Select
						options={[
							{ value: 'Monday', label: 'Monday' },
							{ value: 'Tuesday', label: 'Tuesday' },
							{ value: 'Wednesday', label: 'Wednesday' },
							{ value: 'Thursday', label: 'Thursday' },
							{ value: 'Friday', label: 'Friday' },
							{ value: 'Saturday', label: 'Saturday' },
							{ value: 'Sunday', label: 'Sunday' },
						]}
					/>
				</Form.Item>
				<Form.Item label='Giờ bắt đầu' name='start' rules={[{ required: true }]}>
					<TimePicker format='HH:mm' style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item label='Giờ kết thúc' name='end' rules={[{ required: true }]}>
					<TimePicker format='HH:mm' style={{ width: '100%' }} />
				</Form.Item>

				<Button type='primary' htmlType='submit'>
					Thêm nhân viên
				</Button>
			</Form>
			<Table dataSource={employee} columns={columns} rowKey='id' />
		</div>
	);
};

export default EmployeePage;
