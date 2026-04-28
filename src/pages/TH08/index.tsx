import { Tabs } from "antd";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Health from "./pages/Health";
import Goals from "./pages/Goals";
import Exercises from "./pages/Exercises";

export default () => (
  <Tabs>
    <Tabs.TabPane tab="Dashboard" key="1">
      <Dashboard />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Workouts" key="2">
      <Workouts />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Health" key="3">
      <Health />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Goals" key="4">
      <Goals />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Exercises" key="5">
      <Exercises />
    </Tabs.TabPane>
  </Tabs>
);