import { Tabs, Button } from "antd";
import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import KanbanBoard from "./pages/KanbanBoard";
import TaskList from "./pages/TaskList";
import TaskForm from "./components/TaskForm";

import useTasks from "./hooks/useTasks";
import { Task } from "./types/task";

export default function TH09() {
  const taskHook = useTasks();

  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAdd = () => {
    setEditingTask(null);
    setOpen(true);
  };
const handleEdit = (task: Task) => {
  setEditingTask(task);
  setOpen(true);
};
  const handleSubmit = (task: Task) => {
  if (editingTask) {
    taskHook.updateTask(task);
  } else {
    taskHook.addTask(task);
  }

  setOpen(false);
  setEditingTask(null);
};
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAdd}>
          Add Task
        </Button>
      </div>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Dashboard" key="1">
          <Dashboard stats={taskHook.stats} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Kanban" key="2">
          <KanbanBoard
            taskMap={taskHook.taskMap}
            updateTaskStatus={taskHook.updateTaskStatus}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Task List" key="3">
          <TaskList
            tasks={taskHook.tasks}
            deleteTask={taskHook.deleteTask}
            updateTask={handleEdit}
          />
        </Tabs.TabPane>
      </Tabs>

      <TaskForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingTask}
      />
    </div>
  );
}