import type { ChangeEvent } from 'react';
import styles from './FileInput.module.scss';

interface FileInputProps {
  accept?: string;
  multiple?: boolean;
  label?: string;
  onChange: (files: FileList | null) => void;
}

export function FileInput({
  accept,
  multiple = false,
  label = 'Оберіть файл',
  onChange,
}: FileInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files);
  };

  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <input
        className={styles.input}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
      />
    </label>
  );
}