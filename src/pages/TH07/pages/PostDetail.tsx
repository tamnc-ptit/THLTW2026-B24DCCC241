import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Typography, Tag, Button, Card, Row, Col } from "antd";
import ReactMarkdown from "react-markdown";
import { posts } from "../mock/data";

const { Title, Paragraph } = Typography;

export default function PostDetail() {
  const { slug }: any = useParams();
  const history = useHistory();

  const postIndex = posts.findIndex((p) => p.slug === slug);
  const post = posts[postIndex];

  const [views, setViews] = useState(post?.views || 0);

  useEffect(() => {
    if (post) {
      setViews((prev) => prev + 1);
    }
  }, [slug]);

  if (!post) {
    return <div>Không tìm thấy bài viết</div>;
  }

  const relatedPosts = posts.filter(
    (p) =>
      p.id !== post.id &&
      p.tags.some((tag) => post.tags.includes(tag))
  );

  return (
    <div>
      <Button onClick={() => history.push("/")}>
        Quay lại
      </Button>

      <Title level={2}>{post.title}</Title>

      <Paragraph>
        {post.author} | {post.createdAt} | {views} views
      </Paragraph>

      <div style={{ marginBottom: 16 }}>
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <Card style={{ marginBottom: 24 }}>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </Card>

      <Title level={4}>Bài viết liên quan</Title>

      <Row gutter={[16, 16]}>
        {relatedPosts.map((p) => (
          <Col xs={24} sm={12} md={8} key={p.id}>
            <Card
              hoverable
              cover={
                <img
                  alt={p.title}
                  src={p.thumbnail}
                  style={{ height: 140, objectFit: "cover" }}
                />
              }
            >
              <Card.Meta
                title={<Link to={`/post/${p.slug}`}>{p.title}</Link>}
                description={p.summary}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}