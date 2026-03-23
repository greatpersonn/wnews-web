import { Input } from '@/components/atoms/Input';
import styles from './NewsSearch.module.scss';

interface NewsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function NewsSearch({ value, onChange }: NewsSearchProps) {
  return (
    <div className={styles.wrapper}>
      <Input
        type="text"
        placeholder="Шукайте останні новини саме тут, напишіть щось..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}