import { Button } from '@/components/atoms/Button';
import styles from './ErrorState.module.scss';

interface ErrorStateProps {
  title?: string;
  text?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Щось пішло не так, як треба...',
  text = 'Помилка завантаження даних. Спробуйте оновити сторінку або повторити спробу пізніше.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className={styles.state}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>

      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Спробувати ще раз
        </Button>
      )}
    </div>
  );
}