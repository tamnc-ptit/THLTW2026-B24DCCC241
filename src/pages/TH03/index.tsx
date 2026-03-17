import React, { useState } from 'react';
import { Layout, Menu } from 'antd';

import EmployeePage from './components/employee';
import ServicePage from './components/ServicePage';
import AppointmentPage from './components/AppointmentPage';
import ReviewPage from './components/ReviewPage';
import ReviewReportPage from './components/ReviewReportPage';

const { Sider, Content } = Layout;

const TH03: React.FC = () => {
	const [page, setPage] = useState('employee');

	const renderPage = () => {
		switch (page) {
			case 'employee':
				return <EmployeePage />;

			case 'service':
				return <ServicePage />;

			case 'appointment':
				return <AppointmentPage />;

			case 'review':
				return <ReviewPage />;

			case 'report':
				return <ReviewReportPage />;

			default:
				return <EmployeePage />;
		}
	};

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider>
				<Menu
					theme='dark'
					mode='inline'
					onClick={(e) => setPage(e.key)}
					items={[
						{ key: 'employee', label: 'Nhân viên' },
						{ key: 'service', label: 'Dịch vụ' },
						{ key: 'appointment', label: 'Lịch hẹn' },
						{ key: 'review', label: 'Đánh giá' },
						{ key: 'report', label: 'Thống kê' },
					]}
				/>
			</Sider>

			<Layout>
				<Content style={{ padding: '20px' }}>
					<h2>Thực hành 03</h2>

					{renderPage()}
				</Content>
			</Layout>
		</Layout>
	);
};

export default TH03;
