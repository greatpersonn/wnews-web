import type { PropsWithChildren, ReactNode } from 'react';
import styles from './FormField.module.scss';

interface FormFieldProps extends PropsWithChildren {
  label: string;
  hint?: string;
  action?: ReactNode;
}

export function FormField({ label, hint, action, children }: FormFieldProps) {
  return (
    <div className={styles.field}>
      <div className={styles.top}>
        <label className={styles.label}>{label}</label>
        {action && <div className={styles.action}>{action}</div>}
      </div>

      {children}

      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}