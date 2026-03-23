import { Link } from 'react-router-dom';
import type { NewsArticle } from '@/shared/types/news';
import styles from './BreakingNewsTicker.module.scss';

interface BreakingNewsTickerProps {
  items: NewsArticle[];
}

export function BreakingNewsTicker({ items }: BreakingNewsTickerProps) {
  return (
    <div className={styles.ticker}>
      <div className={styles.label}>Breaking</div>

      <div className={styles.track}>
        <div className={styles.content}>
          {items.map((item) => (
            <Link key={item.id} to={`/news/${item.slug}`} className={styles.link}>
              <span className={styles.dot} />
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}