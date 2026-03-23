import { Tag } from '@/components/atoms/Tag';
import styles from './CategoryFilter.module.scss';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className={styles.wrapper}>
      {categories.map((category) => (
        <Tag
          key={category}
          active={activeCategory === category}
          onClick={() => onChange(category)}
        >
          {category}
        </Tag>
      ))}
    </div>
  );
}