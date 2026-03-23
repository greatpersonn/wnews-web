import { Button } from '@/components/atoms/Button';
import styles from './EmptyState.module.scss';

interface EmptyStateProps {
  title: string;
  text: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  text,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className={styles.state}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>

      {actionLabel && onAction && (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}