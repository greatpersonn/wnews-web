import type { NewsArticle } from '@/shared/types/news';
import { Button } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import styles from './HeroFeatured.module.scss';

interface HeroFeaturedProps {
  article: NewsArticle;
}

export function HeroFeatured({ article }: HeroFeaturedProps) {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.content}>
            <span className={styles.badge}>{article.category}</span>

            <h1 className={styles.title}>{article.title}</h1>

            <p className={styles.excerpt}>{article.excerpt}</p>

            <div className={styles.meta}>
              <span>{article.author}</span>
              <span>{article.publishedAt}</span>
            </div>

            <Button to={`/news/${article.slug}`} variant="primary">
              Дізнатись більше
            </Button>
          </div>

          <div className={styles.media}>
            <img src={article.image} alt={article.title} className={styles.image} />
          </div>
        </div>
      </Container>
    </section>
  );
}