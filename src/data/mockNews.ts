import type { NewsArticleDto } from '@/entities/news/model/types';

export const mockNews: NewsArticleDto[] = [
  {
    id: '1',
    title: 'Weazel News launches a new media platform in Los Santos',
    slug: 'weazel-news-launches-new-media-platform',
    excerpt:
      'The newsroom opens a new digital format for citizens who want instant access to city updates.',
    content:
      'Weazel News has officially launched a new digital media platform focused on breaking stories, city reporting, interviews, and special publications. The new format is designed to make news more accessible, visual, and interactive for all residents of Los Santos.',
    image: 'https://placehold.co/1200x700',
    category: 'Media',
    author: 'Austin Reed',
    publishedAt: '2026-03-23',
    featured: true,
  },
  {
    id: '2',
    title: 'Breaking: traffic incident near Downtown affects morning commute',
    slug: 'traffic-incident-near-downtown',
    excerpt:
      'Authorities report delays in several central districts after an early morning collision.',
    content:
      'Drivers are advised to avoid central routes and use alternate roads while emergency teams work on site. City services say traffic will remain partially limited until the situation is fully stabilized.',
    image: 'https://placehold.co/1200x700',
    category: 'Breaking',
    author: 'Mia Carson',
    publishedAt: '2026-03-22',
  },
  {
    id: '3',
    title: 'Local businesses react to the new media initiative',
    slug: 'local-businesses-react-to-media-initiative',
    excerpt:
      'Entrepreneurs say the platform may improve visibility for community events and announcements.',
    content:
      'Several business owners welcomed the new platform, saying it can help connect citizens with local initiatives, promotions, and public activities more effectively than before.',
    image: 'https://placehold.co/1200x700',
    category: 'Business',
    author: 'Noah Blake',
    publishedAt: '2026-03-21',
  },
  {
    id: '4',
    title: 'New public safety campaign announced for Vespucci districts',
    excerpt:
      'Officials presented a campaign focused on awareness, reporting, and safer public spaces.',
    content:
      'City representatives unveiled a new public safety campaign covering community engagement, better lighting in certain areas, and faster citizen reporting channels.',
    image: 'https://placehold.co/1200x700',
    category: 'City',
    author: 'Emma Hart',
    publishedAt: '2026-03-20',
  },
  {
    id: '5',
    title: 'Special interview: inside the Weazel News editorial process',
    excerpt:
      'Editors explain how stories are selected, prepared, and published for the audience.',
    content:
      'In a special long-read interview, members of the editorial team discussed publication standards, newsroom workflow, content priorities, and the role of live reporting.',
    image: 'https://placehold.co/1200x700',
    category: 'Interview',
    author: 'Olivia Stone',
    publishedAt: '2026-03-19',
  },
  {
    id: '6',
    title: 'Weekend events guide: what to visit in Los Santos',
    excerpt:
      'A fresh city guide featuring public events, cultural points, and community gatherings.',
    content:
      'Residents looking for something to do this weekend can choose from exhibitions, local business gatherings, public shows, and several open-air community events.',
    image: 'https://placehold.co/1200x700',
    category: 'Lifestyle',
    author: 'Lucas Gray',
    publishedAt: '2026-03-18',
  },
];