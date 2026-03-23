import { createHashRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { ArticlePage } from '@/pages/ArticlePage';
import { HomePage } from '@/pages/HomePage';
import { IssueDetailsPage } from '@/pages/IssueDetailsPage';
import { IssuesPage } from '@/pages/IssuesPage';
import { NewsPage } from '@/pages/NewsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { AdminPage } from '@/pages/AdminPage';
import { CreateIssuePage } from '@/pages/CreateIssuePage'
import { CreateNewsPage } from '@/pages/CreateNewsPage';
import { ProtectedRoute } from '@/components/organisms/ProtectedRoute';
import { AdminIssuesPage } from '@/pages/AdminIssuesPage';
import { AdminNewsPage } from '@/pages/AdminNewsPage';
import { EditNewsPage } from '@/pages/EditNewsPage';
import { EditIssuePage } from '@/pages/EditIssuePage';
import { AdminAdsPage } from '@/pages/AdminAdsPage';
import { CreateAdPage } from '@/pages/CreateAdPage';
import { EditAdPage } from '@/pages/EditAdPage';

const router = createHashRouter([
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
        path: '/admin',
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/create-news',
        element: (
          <ProtectedRoute>
            <CreateNewsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/create-issue',
        element: (
          <ProtectedRoute>
            <CreateIssuePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/news',
        element: (
          <ProtectedRoute>
            <AdminNewsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/issues',
        element: (
          <ProtectedRoute>
            <AdminIssuesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/edit-news/:slug',
        element: (
          <ProtectedRoute>
            <EditNewsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/edit-issue/:slug',
        element: (
          <ProtectedRoute>
            <EditIssuePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/ads',
        element: (
          <ProtectedRoute>
            <AdminAdsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/create-ad',
        element: (
          <ProtectedRoute>
            <CreateAdPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/edit-ad/:slug',
        element: (
          <ProtectedRoute>
            <EditAdPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;