import { useState } from "react";
import { tags as mockTags } from "../mock/data";
import { Table, Button, Input } from "antd";

export default function AdminTags() {
  const [data, setData] = useState(mockTags);
  const [name, setName] = useState("");

  const handleAdd = () => {
    setData([...data, { id: Date.now(), name }]);
    setName("");
  };

  return (
    <div>
      <Input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Tag name"
      />
      <Button onClick={handleAdd}>Add</Button>

      <Table
        dataSource={data}
        rowKey="id"
        columns={[
          { title: "Name", dataIndex: "name" },
        ]}
      />
    </div>
  );
}

