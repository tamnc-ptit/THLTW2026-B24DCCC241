export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  summary: string;
  thumbnail: string;
  tags: string[];
  author: string;
  createdAt: string;
  status: "draft" | "published";
  views: number;
}

export interface Tag {
  id: number;
  name: string;
}