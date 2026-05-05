import { Table, Input, Select, Button, Space } from "antd";
import { useState } from "react";
import { Task, Status } from "../types/task";
import { sortByDeadline } from "../utils/helpers";
interface Props {
  tasks: Task[];
  deleteTask: (id: string) => void;
  updateTask: (task: Task) => void;
}

export default function TaskList({ tasks, deleteTask , updateTask}: Props) {

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | undefined>();

  const filteredData = tasks
    .filter((t) =>
      t.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((t) => (statusFilter ? t.status === statusFilter : true));

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Priority",
      dataIndex: "priority",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      sorter: sortByDeadline,
    },
    {
      title: "Action",
      render: (_: any, record: Task) => (
        <>
        <Button danger onClick={()=> updateTask(record)}>Update</Button>
        <Button danger onClick={() => deleteTask(record.id)}>
          Delete
        </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Select
          placeholder="Filter status"
          allowClear
          style={{ width: 150 }}
          onChange={(value) => setStatusFilter(value)}
        >
          <Select.Option value="todo">Todo</Select.Option>
          <Select.Option value="inprogress">In Progress</Select.Option>
          <Select.Option value="done">Done</Select.Option>
        </Select>
      </Space>

      <Table
        rowKey="id"
        dataSource={filteredData}
        columns={columns}
      />
    </div>
  );
}