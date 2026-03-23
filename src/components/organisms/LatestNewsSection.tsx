import type { NewsArticle } from '@/shared/types/news';
import { SectionTitle } from '@/components/atoms/SectionTitle';
import { SectionSubtitle } from '@/components/atoms/SectionSubtitle';
import { NewsCard } from '@/components/molecules/NewsCard';
import styles from './LatestNewsSection.module.scss';

interface LatestNewsSectionProps {
  items: NewsArticle[];
}

export function LatestNewsSection({ items }: LatestNewsSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <SectionTitle>Latest News</SectionTitle>
        <SectionSubtitle>
          The newest stories, public reports, editorials, and breaking updates from the
          Weazel News desk.
        </SectionSubtitle>
      </div>

      <div className={styles.grid}>
        {items.map((item) => (
          <NewsCard key={item.id} article={item} />
        ))}
      </div>
    </section>
  );
}