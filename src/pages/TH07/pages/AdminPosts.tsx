import React, { useState } from "react";
import { Table, Button, Input, Modal, Form, Select, Popconfirm } from "antd";
import { posts as initialPosts } from "../mock/data";

const { Option } = Select;

export default function AdminPosts() {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);

  const [form] = Form.useForm();

  // FILTER
  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // OPEN ADD
  const openAdd = () => {
    setEditingPost(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // OPEN EDIT
  const openEdit = (record: any) => {
    setEditingPost(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  // SAVE (ADD / EDIT)
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingPost) {
        // EDIT
        setPosts((prev) =>
          prev.map((p) =>
            p.id === editingPost.id ? { ...p, ...values } : p
          )
        );
      } else {
        // ADD
        const newPost = {
          ...values,
          id: Date.now(),
          views: 0,
        };
        setPosts((prev) => [...prev, newPost]);
      }

      setIsModalOpen(false);
      form.resetFields();
    });
  };

  // DELETE
  const handleDelete = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => tags?.join(", "),
    },
    {
      title: "Lượt xem",
      dataIndex: "views",
      key: "views",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <>
          <Button onClick={() => openEdit(record)} style={{ marginRight: 8 }}>
            Sửa
          </Button>

          <Popconfirm
            title="Xóa bài viết?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      {/* SEARCH + ADD */}
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm theo tiêu đề"
          style={{ width: 300, marginRight: 8 }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button type="primary" onClick={openAdd}>
          Thêm bài viết
        </Button>
      </div>

      {/* TABLE */}
      <Table dataSource={filteredPosts} columns={columns} rowKey="id" />

      {/* MODAL */}
      <Modal
        title={editingPost ? "Sửa bài viết" : "Thêm bài viết"}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="slug" label="Slug">
            <Input />
          </Form.Item>

          <Form.Item name="summary" label="Tóm tắt">
            <Input />
          </Form.Item>

          <Form.Item name="thumbnail" label="Ảnh (URL)">
            <Input />
          </Form.Item>

          <Form.Item name="tags" label="Tags">
            <Select mode="tags" />
          </Form.Item>

          <Form.Item name="status" label="Trạng thái">
            <Select>
              <Option value="draft">Nháp</Option>
              <Option value="published">Đã đăng</Option>
            </Select>
          </Form.Item>

          <Form.Item name="content" label="Nội dung">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}