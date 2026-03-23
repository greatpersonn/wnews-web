import styles from './CheckboxField.module.scss';

interface CheckboxFieldProps {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}

export function CheckboxField({
  checked,
  label,
  onChange,
}: CheckboxFieldProps) {
  return (
    <label className={styles.wrapper}>
      <input
        className={styles.input}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.box} />
      <span className={styles.label}>{label}</span>
    </label>
  );
}