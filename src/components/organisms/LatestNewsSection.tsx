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
        <SectionTitle>Останні новини</SectionTitle>
        <SectionSubtitle>
          Останні історії, публічні звіти, редакційні матеріали та важливі оновлення з
          редакції Weazel News.
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