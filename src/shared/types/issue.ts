export interface NewspaperIssuePage {
  id: string;
  image: string;
  title?: string;
}

export interface NewspaperIssue {
  id: string;
  title: string;
  slug: string;
  cover: string;
  description: string;
  publishedAt: string;
  issueNumber: number;
  category: string;
  pages: NewspaperIssuePage[];
}