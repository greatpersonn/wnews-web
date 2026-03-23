import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { ArticlePage } from '@/pages/ArticlePage';
import { HomePage } from '@/pages/HomePage';
import { IssueDetailsPage } from '@/pages/IssueDetailsPage';
import { IssuesPage } from '@/pages/IssuesPage';
import { NewsPage } from '@/pages/NewsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'news',
        element: <NewsPage />,
      },
      {
        path: 'news/:slug',
        element: <ArticlePage />,
      },
      {
        path: 'issues',
        element: <IssuesPage />,
      },
      {
        path: 'issues/:slug',
        element: <IssueDetailsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;