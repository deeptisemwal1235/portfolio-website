export type ProjectRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  year: number | null;
  category: string | null;
  tags: string[] | null;
  read_time: string | null;
  display_order: number | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type PostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  category: string | null;
  tags: string[] | null;
  read_time: string | null;
  published_at: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};
