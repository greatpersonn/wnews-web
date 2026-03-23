import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import { LoadingState } from '@/widgets/states/LoadingState';
import { AccessDeniedPage } from '@/pages/AccessDeniedPage';
import { useAuth } from '@/shared/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading, isAuthenticated, isAdmin } = useAuth();

  if (isLoading) {
    return <LoadingState label="Перевірка доступу..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.home} replace />;
  }

  if (!isAdmin) {
    return <AccessDeniedPage />;
  }

  return <>{children}</>;
}