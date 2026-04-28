import React from "react";
import { Card, Row, Col, Timeline, Statistic } from "antd";
import { Column, ColumnConfig, Line, LineConfig } from "@ant-design/charts";
import { FireOutlined, CheckCircleOutlined, RocketOutlined } from "@ant-design/icons";
import { workouts } from "../../mock/workouts";
import { healthLogs } from "../../mock/health";

export default function Dashboard() {
  const totalWorkouts = workouts.length;
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  const streak = workouts.filter(w => w.status === "completed").length;

  const barConfig: ColumnConfig = {
    data: [
      { week: "Tuần 1", value: 2 },
      { week: "Tuần 2", value: 3 },
      { week: "Tuần 3", value: 1 },
      { week: "Tuần 4", value: 4 },
    ],
    xField: "week",
    yField: "value",
    label: { position: "middle" as const },
    theme: 'light'
  };

  const lineConfig: LineConfig = {
    data: healthLogs.map(item => ({ date: item.date, weight: item.weight })),
    xField: "date",
    yField: "weight",
    smooth: true,
  };

  const latestWorkouts = [...workouts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div style={{ padding: '8px' }}>
      <Row gutter={[16, 16]}>
        <Col span={6}><Card><Statistic title="Buổi tập" value={totalWorkouts} prefix={<CheckCircleOutlined />} /></Card></Col>
        <Col span={6}><Card><Statistic title="Calo" value={totalCalories} prefix={<FireOutlined />} suffix="kcal" /></Card></Col>
        <Col span={6}><Card><Statistic title="Streak" value={streak} prefix={<RocketOutlined />} /></Card></Col>
        <Col span={6}><Card><Statistic title="Mục tiêu" value={80} suffix="%" /></Card></Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="Tần suất tập luyện"><Column {...barConfig} /></Card>
        </Col>
        <Col span={12}>
          <Card title="Biểu đồ cân nặng"><Line {...lineConfig} /></Card>
        </Col>
      </Row>

      <Card title="Hoạt động gần đây" style={{ marginTop: 16 }}>
        <Timeline>
          {latestWorkouts.map(w => (
            <Timeline.Item key={w.id} color="blue">{w.date}: {w.type} - {w.duration}p</Timeline.Item>
          ))}
        </Timeline>
      </Card>
    </div>
  );
}