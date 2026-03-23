import { Link } from 'react-router-dom';
import type { NewsArticle } from '@/shared/types/news';
import { formatDate } from '@/shared/lib/formatDate';
import styles from './TopStoriesSidebar.module.scss';

interface TopStoriesSidebarProps {
  items: NewsArticle[];
  title?: string;
}

export function TopStoriesSidebar({
  items,
  title = 'Top Stories',
}: TopStoriesSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.head}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.list}>
        {items.map((item, index) => (
          <article key={item.id} className={styles.item}>
            <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>

            <div className={styles.content}>
              <span className={styles.category}>{item.category}</span>

              <h3 className={styles.itemTitle}>
                <Link to={`/news/${item.slug}`}>{item.title}</Link>
              </h3>

              <div className={styles.meta}>
                <span>{item.author}</span>
                <span>{formatDate(item.publishedAt)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}