import React from 'react';
import { Card, Row, Col, Typography, Tag, Space, Divider, Avatar, Button } from 'antd';
import { 
  GithubOutlined, 
  LinkedinOutlined, 
  FacebookOutlined, 
  GlobalOutlined,
  MailOutlined 
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function About() {
  const authorInfo = {
    name: "Nguyễn Văn A",
    role: "Fullstack Developer / Blogger",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", // Ảnh đại diện giả lập
    bio: "Chào bạn! Mình là một lập trình viên đam mê viết lách. Blog này là nơi mình chia sẻ những kiến thức về lập trình, kinh nghiệm thực chiến và những suy nghĩ về công nghệ trong cuộc sống hàng ngày.",
    skills: ["React", "TypeScript", "Node.js", "Ant Design", "Kubuntu Linux", "Docker"],
    social: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      facebook: "https://facebook.com/",
      email: "mailto:example@gmail.com"
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 0' }}>
      <Card bordered={false} className="about-card">
        <Row gutter={[32, 32]} align="middle">
          {/* Cột bên trái: Ảnh đại diện & Liên kết */}
          <Col xs={24} md={8} style={{ textAlign: 'center' }}>
            <Avatar 
              size={180} 
              src={authorInfo.avatar} 
              style={{ border: '4px solid #f0f2f5', marginBottom: 20 }}
            />
            <Title level={3} style={{ marginBottom: 0 }}>{authorInfo.name}</Title>
            <Text type="secondary">{authorInfo.role}</Text>
            
            <Divider />
            
            <Space size="large">
              <Button type="link" icon={<GithubOutlined style={{ fontSize: 24 }} />} href={authorInfo.social.github} target="_blank" />
              <Button type="link" icon={<LinkedinOutlined style={{ fontSize: 24 }} />} href={authorInfo.social.linkedin} target="_blank" />
              <Button type="link" icon={<FacebookOutlined style={{ fontSize: 24 }} />} href={authorInfo.social.facebook} target="_blank" />
              <Button type="link" icon={<MailOutlined style={{ fontSize: 24 }} />} href={authorInfo.social.email} />
            </Space>
          </Col>

          {/* Cột bên phải: Tiểu sử & Kỹ năng */}
          <Col xs={24} md={16}>
            <Title level={2}>Về tôi</Title>
            <Paragraph style={{ fontSize: 16 }}>
              {authorInfo.bio}
            </Paragraph>
            
            <Divider orientation="left">Kỹ năng chuyên môn</Divider>
            <div style={{ marginBottom: 24 }}>
              {authorInfo.skills.map(skill => (
                <Tag color="geekblue" key={skill} style={{ marginBottom: 8, padding: '4px 12px', fontSize: 14 }}>
                  {skill}
                </Tag>
              ))}
            </div>

            <Divider orientation="left">Thông tin liên hệ</Divider>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: 8 }}>
                <GlobalOutlined /> <Text strong> Website:</Text> <a href="https://myblog.com">www.myblog.com</a>
              </li>
              <li style={{ marginBottom: 8 }}>
                <MailOutlined /> <Text strong> Email:</Text> contact@example.com
              </li>
            </ul>
          </Col>
        </Row>
      </Card>

      {/* Phần giới thiệu thêm (Tùy chọn) */}
      <Card bordered={false} style={{ marginTop: 24 }}>
        <Title level={4}>Sứ mệnh của Blog</Title>
        <Paragraph>
          Mục tiêu của mình khi xây dựng Blog này là tạo ra một thư viện kiến thức mở, 
          giúp các bạn sinh viên mới bắt đầu tiếp cận với lập trình một cách dễ dàng và bài bản hơn.
        </Paragraph>
      </Card>
    </div>
  );
}