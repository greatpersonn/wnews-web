import type { NewspaperIssueDto } from '@/entities/issue/model/types';

export const mockIssues: NewspaperIssueDto[] = [
  {
    id: '1',
    title: 'City Pulse',
    slug: 'city-pulse-001',
    cover: 'https://placehold.co/700x900?text=City+Pulse+Cover',
    description:
      'Main city events, business updates, and public reactions to the latest developments in Los Santos.',
    publishedAt: '2026-03-21',
    issueNumber: 1,
    category: 'City',
    pages: [
      { id: '1-1', image: 'https://placehold.co/1200x1600?text=City+Pulse+Page+1', title: 'Cover' },
      { id: '1-2', image: 'https://placehold.co/1200x1600?text=City+Pulse+Page+2', title: 'Main stories' },
      { id: '1-3', image: 'https://placehold.co/1200x1600?text=City+Pulse+Page+3', title: 'Business section' },
    ],
  },
  {
    id: '2',
    title: 'Downtown Report',
    slug: 'downtown-report-002',
    cover: 'https://placehold.co/700x900?text=Downtown+Report+Cover',
    description:
      'A focused issue covering transport incidents, downtown business, and emergency response updates.',
    publishedAt: '2026-03-18',
    issueNumber: 2,
    category: 'Breaking',
    pages: [
      { id: '2-1', image: 'https://placehold.co/1200x1600?text=Downtown+Report+Page+1', title: 'Cover' },
      { id: '2-2', image: 'https://placehold.co/1200x1600?text=Downtown+Report+Page+2', title: 'Traffic & response' },
      { id: '2-3', image: 'https://placehold.co/1200x1600?text=Downtown+Report+Page+3', title: 'District overview' },
    ],
  },
  {
    id: '3',
    title: 'Weazel Weekly',
    slug: 'weazel-weekly-003',
    cover: 'https://placehold.co/700x900?text=Weazel+Weekly+Cover',
    description:
      'Weekly digest with the most important headlines, interviews, and visual reports from across the city.',
    publishedAt: '2026-03-15',
    issueNumber: 3,
    category: 'Magazine',
    pages: [
      { id: '3-1', image: 'https://placehold.co/1200x1600?text=Weazel+Weekly+Page+1', title: 'Cover' },
      { id: '3-2', image: 'https://placehold.co/1200x1600?text=Weazel+Weekly+Page+2', title: 'Weekly highlights' },
      { id: '3-3', image: 'https://placehold.co/1200x1600?text=Weazel+Weekly+Page+3', title: 'Interview' },
    ],
  },
];