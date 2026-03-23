import { Button } from '@/components/atoms/Button';
import styles from './ErrorState.module.scss';

interface ErrorStateProps {
  title?: string;
  text?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  text = 'Failed to load the requested data.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className={styles.state}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>

      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}