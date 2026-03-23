import type { PropsWithChildren } from 'react';
import styles from './Tag.module.scss';

interface TagProps extends PropsWithChildren {
  active?: boolean;
  onClick?: () => void;
}

export function Tag({ children, active = false, onClick }: TagProps) {
  return (
    <button
      type="button"
      className={`${styles.tag} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}