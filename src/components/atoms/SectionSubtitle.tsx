import type { PropsWithChildren } from 'react';
import styles from './SectionSubtitle.module.scss';

export function SectionSubtitle({ children }: PropsWithChildren) {
  return <p className={styles.subtitle}>{children}</p>;
}