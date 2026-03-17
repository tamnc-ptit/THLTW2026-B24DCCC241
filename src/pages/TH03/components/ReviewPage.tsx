import { useState } from 'react';
import { Table, Button, Rate, Input, Modal, Form } from 'antd';

interface Appointment {
	id: number;
	customer: string;
	employee: string;
	service: string;
	status: string;
}

interface Review {
	id: number;
	appointmentId: number;
	employee: string;
	rating: number;
	comment: string;
	reply?: string;
}

const ReviewPage: React.FC = () => {
	const [appointments] = useState<Appointment[]>([
		{ id: 1, customer: 'Nam', employee: 'Anh', service: 'Cắt tóc', status: 'Hoàn thành' },
		{ id: 2, customer: 'Lan', employee: 'Bình', service: 'Massage', status: 'Xác nhận' },
		{ id: 3, customer: 'Huy', employee: 'Anh', service: 'Gội đầu', status: 'Hoàn thành' },
	]);

	const [reviews, setReviews] = useState<Review[]>([]);
	const [open, setOpen] = useState(false);
	const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null);
	const [form] = Form.useForm();

	const openReview = (record: Appointment) => {
		setCurrentAppointment(record);
		setOpen(true);
	};

	const saveReview = (values: any) => {
		const newReview: Review = {
			id: Date.now(),
			appointmentId: currentAppointment!.id,
			employee: currentAppointment!.employee,
			rating: values.rating,
			comment: values.comment,
		};

		setReviews([...reviews, newReview]);

		setOpen(false);
		form.resetFields();
	};

	const replyReview = (id: number, reply: string) => {
		const updated = reviews.map((r) => (r.id === id ? { ...r, reply } : r));

		setReviews(updated);
	};

	const averageRating = (employee: string) => {
		const empReviews = reviews.filter((r) => r.employee === employee);

		if (empReviews.length === 0) return 0;

		const total = empReviews.reduce((sum, r) => sum + r.rating, 0);

		return (total / empReviews.length).toFixed(1);
	};

	const columns = [
		{
			title: 'Khách',
			dataIndex: 'customer',
		},
		{
			title: 'Nhân viên',
			dataIndex: 'employee',
		},
		{
			title: 'Dịch vụ',
			dataIndex: 'service',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
		},
		{
			title: 'Đánh giá',
			render: (record: Appointment) => {
				if (record.status !== 'Hoàn thành') return 'Chưa thể đánh giá';

				const reviewed = reviews.find((r) => r.appointmentId === record.id);

				if (reviewed) return <Rate disabled defaultValue={reviewed.rating} />;

				return (
					<Button type='primary' onClick={() => openReview(record)}>
						Đánh giá
					</Button>
				);
			},
		},
	];

	const reviewColumns = [
		{
			title: 'Nhân viên',
			dataIndex: 'employee',
		},
		{
			title: 'Rating',
			render: (record: Review) => <Rate disabled defaultValue={record.rating} />,
		},
		{
			title: 'Bình luận',
			dataIndex: 'comment',
		},
		{
			title: 'Phản hồi',
			render: (record: Review) => {
				if (record.reply) return record.reply;

				let replyText = '';

				return (
					<>
						<Input placeholder='Phản hồi...' onChange={(e) => (replyText = e.target.value)} />

						<Button onClick={() => replyReview(record.id, replyText)}>Gửi</Button>
					</>
				);
			},
		},
	];

	const employees = [...new Set(appointments.map((a) => a.employee))];

	return (
		<div>
			<h2>Lịch hẹn</h2>

			<Table dataSource={appointments} columns={columns} rowKey='id' />

			<h2 style={{ marginTop: 40 }}>Đánh giá</h2>

			<Table dataSource={reviews} columns={reviewColumns} rowKey='id' />

			<h2 style={{ marginTop: 40 }}>Rating nhân viên</h2>

			<ul>
				{employees.map((e) => (
					<li key={e}>
						{e} : ⭐ {averageRating(e)}
					</li>
				))}
			</ul>

			<Modal visible={open} onCancel={() => setOpen(false)} footer={null} title='Đánh giá dịch vụ'>
				<Form form={form} onFinish={saveReview}>
					<Form.Item name='rating' label='Số sao' rules={[{ required: true }]}>
						<Rate />
					</Form.Item>

					<Form.Item name='comment' label='Bình luận'>
						<Input.TextArea />
					</Form.Item>

					<Button type='primary' htmlType='submit'>
						Gửi đánh giá
					</Button>
				</Form>
			</Modal>
		</div>
	);
};

export default ReviewPage;
