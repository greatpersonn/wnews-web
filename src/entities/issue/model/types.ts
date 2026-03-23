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

export interface NewspaperIssuePageDto {
  id: string;
  image: string;
  title?: string;
}

export interface NewspaperIssueDto {
  id: string;
  title: string;
  slug?: string;
  cover: string;
  description: string;
  publishedAt: string;
  issueNumber: number;
  category: string;
  pages: NewspaperIssuePageDto[];
}