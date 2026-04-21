import React, { useState, useEffect } from "react";
import { Card, Input, Tag, Pagination, Row, Col, Typography } from "antd";
import { posts as mockPosts } from "../mock/data";

const { Paragraph } = Typography;
const pageSize = 9;

export default function Home() {
  const [keyword, setKeyword] = useState(""); // Giá trị thực tế dùng để lọc
  const [displayValue, setDisplayValue] = useState(""); // Giá trị hiển thị ở ô Input
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Xử lý Debounce 300ms cho ô Search
  useEffect(() => {
    const handler = setTimeout(() => {
      setKeyword(displayValue);
      setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
    }, 300);

    return () => clearTimeout(handler);
  }, [displayValue]);

  // 2. Logic Lọc bài viết
  const filtered = mockPosts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(keyword.toLowerCase());
    const matchTag = selectedTag ? p.tags.includes(selectedTag) : true;
    return matchSearch && matchTag;
  });

  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
console.log(mockPosts);
  return (
    <div>
      {/* Ô tìm kiếm */}
      <Input
        placeholder="Tìm kiếm bài viết..."
        value={displayValue}
        onChange={(e) => setDisplayValue(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
        allowClear
      />

      {/* Bộ lọc Tag */}
      <div style={{ marginBottom: 20 }}>
        <span style={{ marginRight: 8 }}>Thẻ:</span>
        <Tag
          color={selectedTag === null ? "blue" : undefined}
          onClick={() => { setSelectedTag(null); setCurrentPage(1); }}
          style={{ cursor: "pointer" }}
        >
          Tất cả
        </Tag>
        {["React", "JavaScript", "CSS"].map((tag) => (
          <Tag
            key={tag}
            color={selectedTag === tag ? "blue" : undefined}
            onClick={() => { setSelectedTag(tag); setCurrentPage(1); }}
            style={{ cursor: "pointer" }}
          >
            {tag}
          </Tag>
        ))}
      </div>

      {/* Danh sách bài viết - Dùng Row/Col của Antd thay cho Grid thuần để đồng bộ responsive */}
      <Row gutter={[16, 16]}>
        {paginated.map((post) => (
          <Col xs={24} sm={12} md={8} key={post.id}>
            <Card
              hoverable
              cover={
                <img
                  alt={post.title}
                  src={post.thumbnail}
                  style={{ height: 160, objectFit: "cover" }}
                />
              }
            >
              <Card.Meta
                title={post.title}
                description={
                  <>
                    <Paragraph ellipsis={{ rows: 2 }} type="secondary">
                      {post.summary}
                    </Paragraph>
                    <div style={{ marginTop: 8 }}>
                      {post.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Phân trang */}
      <Pagination
        style={{ marginTop: 24, textAlign: "center" }}
        current={currentPage}
        pageSize={pageSize}
        total={filtered.length}
        onChange={(page) => setCurrentPage(page)}
        showSizeChanger={false}
      />
    </div>
  );
}