import { Link } from 'react-router-dom';
import type { NewsArticle } from '@/shared/types/news';
import { formatDate } from '@/shared/lib/formatDate';
import styles from './NewsCard.module.scss';

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <article className={styles.card}>
      <Link to={`/news/${article.slug}`} className={styles.imageLink}>
        <img className={styles.image} src={article.image} alt={article.title} />
      </Link>

      <div className={styles.body}>
        <span className={styles.category}>{article.category}</span>

        <h3 className={styles.title}>
          <Link to={`/news/${article.slug}`}>{article.title}</Link>
        </h3>

        <p className={styles.excerpt}>{article.excerpt}</p>

        <div className={styles.meta}>
          <span>{article.author}</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </article>
  );
}