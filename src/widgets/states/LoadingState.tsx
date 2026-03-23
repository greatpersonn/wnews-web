import styles from './LoadingState.module.scss';

interface LoadingStateProps {
  label?: string;
}

export function LoadingState({ label = 'Друкуємо газети...' }: LoadingStateProps) {
  return (
    <div className={styles.state}>
      <div className={styles.spinner} />
      <p className={styles.label}>{label}</p>
    </div>
  );
}