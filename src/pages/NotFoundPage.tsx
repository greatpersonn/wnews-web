import { Button } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import { ROUTES } from '@/shared/constants/routes';
import styles from './NotFoundPage.module.scss';

export function NotFoundPage() {
  return (
    <Container>
      <div className={styles.page}>
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.text}>
          The page you are trying to access does not exist or has been moved.
        </p>

        <div className={styles.actions}>
          <Button to={ROUTES.home} variant="primary">
            Go home
          </Button>
          <Button to={ROUTES.news} variant="secondary">
            Open news
          </Button>
        </div>
      </div>
    </Container>
  );
}