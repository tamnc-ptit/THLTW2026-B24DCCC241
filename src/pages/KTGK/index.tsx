import { useState } from 'react';
import { message, Modal } from 'antd';
import CourseTable from './components/CourseTable';
import CourseModal from './components/CourseModal';
import { Course, Instructor } from './types';

export default function App() {
	const [courses, setCourses] = useState<Course[]>([
		{
			id: 1,
			name: 'React cơ bản',
			instructor_id: 1,
			instructor_name: 'Nguyễn Văn A',
			student_count: 25,
			description: '<b>Học React từ đầu</b><br/>Bao gồm Hooks',
			status: 'OPEN',
		},
		{
			id: 2,
			name: 'React nâng cao',
			instructor_id: 1,
			instructor_name: 'Nguyễn Văn A',
			student_count: 15,
			description: '<i>Redux, Context API</i>',
			status: 'OPEN',
		},
		{
			id: 3,
			name: 'NodeJS cơ bản',
			instructor_id: 2,
			instructor_name: 'Trần Thị B',
			student_count: 0,
			description: 'Backend với Express',
			status: 'PAUSED',
		},
		{
			id: 4,
			name: 'NodeJS nâng cao',
			instructor_id: 2,
			instructor_name: 'Trần Thị B',
			student_count: 40,
			description: '<b>JWT, Middleware</b>',
			status: 'CLOSED',
		},
		{
			id: 5,
			name: 'HTML CSS',
			instructor_id: 3,
			instructor_name: 'Lê Văn C',
			student_count: 10,
			description: 'Nền tảng web',
			status: 'OPEN',
		},
		{
			id: 6,
			name: 'JavaScript cơ bản',
			instructor_id: 3,
			instructor_name: 'Lê Văn C',
			student_count: 0,
			description: '<b>Biến, hàm, DOM</b>',
			status: 'OPEN',
		},
		{
			id: 7,
			name: 'TypeScript',
			instructor_id: 4,
			instructor_name: 'Phạm Thị D',
			student_count: 8,
			description: 'Type an toàn hơn JS',
			status: 'PAUSED',
		},
		{
			id: 8,
			name: 'Fullstack MERN',
			instructor_id: 4,
			instructor_name: 'Phạm Thị D',
			student_count: 30,
			description: '<b>MongoDB + Express + React + Node</b>',
			status: 'CLOSED',
		},
	]);

	const instructors: Instructor[] = [
		{ id: 1, name: 'Nguyễn Văn A' },
		{ id: 2, name: 'Trần Thị B' },
		{ id: 3, name: 'Lê Văn C' },
		{ id: 4, name: 'Phạm Thị D' },
	];
	const [search, setSearch] = useState('');
	const [status, setStatus] = useState<any>();
	const [instructor, setInstructor] = useState<any>();
	const [sort, setSort] = useState<any>();

	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState<Course | null>(null);

	// FILTER + SORT
	const filtered = courses
		.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
		.filter((c) => (status ? c.status === status : true))
		.filter((c) => (instructor ? c.instructor_id === instructor : true))
		.sort((a, b) =>
			sort === 'asc' ? a.student_count - b.student_count : sort === 'desc' ? b.student_count - a.student_count : 0,
		);

	const handleSave = (values: any) => {
		const instructorObj = instructors.find((i) => i.id === values.instructor_id);

		if (courses.some((c) => c.name === values.name && c.id !== editing?.id)) {
			message.error('Tên khóa học đã tồn tại');
			return;
		}

		if (editing) {
			setCourses((prev) =>
				prev.map((c) =>
					c.id === editing.id
						? {
								...c,
								...values,
								instructor_name: instructorObj?.name || '',
						  }
						: c,
				),
			);
			message.success('Cập nhật thành công');
		} else {
			setCourses((prev) => [
				...prev,
				{
					id: Date.now(),
					...values,
					instructor_name: instructorObj?.name || '',
				},
			]);
			message.success('Thêm thành công');
		}

		setOpen(false);
		setEditing(null);
	};


	const handleDelete = (c: Course) => {
		if (c.student_count > 0) {
			message.error('Không thể xóa');
			return;
		}

		Modal.confirm({
			title: 'Xác nhận xóa?',
			onOk: () => {
				setCourses((prev) => prev.filter((i) => i.id !== c.id));
				message.success('Đã xóa');
			},
		});
	};

	return (
		<div style={{ padding: 20 }}>
			<CourseTable
				courses={filtered}
				instructors={instructors}
				onEdit={(c) => {
					setEditing(c);
					setOpen(true);
				}}
				onDelete={handleDelete}
				onAdd={() => setOpen(true)}
				setSearch={setSearch}
				setStatus={setStatus}
				setInstructor={setInstructor}
				setSort={setSort}
			/>

			<CourseModal
				open={open}
				onCancel={() => {
					setOpen(false);
					setEditing(null);
				}}
				onSave={handleSave}
				editing={editing}
				instructors={instructors}
			/>
		</div>
	);
}
