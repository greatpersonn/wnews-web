import type { TextareaHTMLAttributes } from 'react';
import styles from './TextArea.module.scss';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea(props: TextAreaProps) {
  return <textarea className={styles.textarea} {...props} />;
}