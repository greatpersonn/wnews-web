export interface AdItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  contact: string;
  link?: string;
  publishedAt: string;
  isActive: boolean;
  priority: number;
}

export interface AdItemDto {
  id: string;
  title: string;
  slug?: string;
  description: string;
  image: string;
  category: string;
  contact: string;
  link?: string;
  publishedAt: string;
  isActive: boolean;
  priority: number;
}