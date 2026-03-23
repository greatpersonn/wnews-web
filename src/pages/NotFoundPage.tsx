import { Button } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import { ROUTES } from '@/shared/constants/routes';
import styles from './NotFoundPage.module.scss';

export function NotFoundPage() {
  return (
    <Container>
      <div className={styles.page}>
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Сторінку не знайдено</h1>
        <p className={styles.text}>
          Сторінка, яку ви шукаєте, не існує або була перенесена.
        </p>

        <div className={styles.actions}>
          <Button to={ROUTES.home} variant="primary">
            На головну
          </Button>
          <Button to={ROUTES.news} variant="secondary">
            До стрічки новин
          </Button>
        </div>
      </div>
    </Container>
  );
}