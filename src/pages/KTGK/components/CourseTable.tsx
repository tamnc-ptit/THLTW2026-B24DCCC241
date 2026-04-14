import { Table, Input, Select, Button } from "antd";
import { Course, Instructor } from "../types";

type Props = {
  courses: Course[];
  instructors: Instructor[];
  onEdit: (c: Course) => void;
  onDelete: (c: Course) => void;
  onAdd: () => void;
  setSearch: (v: string) => void;
  setStatus: (v: any) => void;
  setInstructor: (v: any) => void;
  setSort: (v: any) => void;
};

export default function CourseTable(props: Props) {
  const {
    courses,
    instructors,
    onEdit,
    onDelete,
    onAdd,
    setSearch,
    setStatus,
    setInstructor,
    setSort,
  } = props;

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Tên", dataIndex: "name" },
    { title: "Giảng viên", dataIndex: "instructor_name" },
    { title: "Học viên", dataIndex: "student_count" },

    {
      title: "Mô tả",
      render: (_: any, record: Course) => (
        <div
          dangerouslySetInnerHTML={{ __html: record.description }}
        />
      ),
    },

    {
      title: "Trạng thái",
      render: (_: any, record: Course) => {
        if (record.status === "OPEN") return "Đang mở";
        if (record.status === "CLOSED") return "Đã kết thúc";
        return "Tạm dừng";
      },
    },

    {
      title: "Action",
      render: (_: any, record: Course) => (
        <>
          <Button onClick={() => onEdit(record)}>Sửa</Button>
          <Button danger onClick={() => onDelete(record)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <Input placeholder="Tìm kiếm..." onChange={(e) => setSearch(e.target.value)} />

        <Select
          placeholder="Trạng thái"
          allowClear
          onChange={setStatus}
          options={[
            { label: "Đang mở", value: "OPEN" },
            { label: "Đã kết thúc", value: "CLOSED" },
            { label: "Tạm dừng", value: "PAUSED" },
          ]}
        />

        <Select
          placeholder="Giảng viên"
          allowClear
          onChange={setInstructor}
          options={instructors.map((i) => ({
            label: i.name,
            value: i.id,
          }))}
        />

        <Select
          placeholder="Sắp xếp học viên"
          allowClear
          onChange={setSort}
          options={[
            { label: "Tăng dần", value: "asc" },
            { label: "Giảm dần", value: "desc" },
          ]}
        />

        <Button type="primary" onClick={onAdd}>
          + Thêm
        </Button>
      </div>

      <Table columns={columns} dataSource={courses} rowKey="id" />
    </>
  );
}