import type { AdItem } from '@/entities/ad/model/types';
import { AdCard } from '@/components/molecules/AdCard';
import styles from './AdsSidebar.module.scss';

interface AdsSidebarProps {
  items: AdItem[];
  title?: string;
}

export function AdsSidebar({
  items,
  title = 'Оголошення',
}: AdsSidebarProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.head}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.list}>
        {items.map((item) => (
          <AdCard key={item.id} item={item} />
        ))}
      </div>
    </aside>
  );
}