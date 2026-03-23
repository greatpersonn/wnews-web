import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import { NewsCard } from '@/components/molecules/NewsCard';
import { getNewsBySlug, getNewsList } from '@/entities/news/api/news.service';
import type { NewsArticle } from '@/entities/news/model/types';
import { formatDate } from '@/shared/lib/formatDate';
import { ErrorState } from '@/widgets/states/ErrorState';
import { LoadingState } from '@/widgets/states/LoadingState';
import styles from './ArticlePage.module.scss';

export function ArticlePage() {
  const { slug = '' } = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadArticle = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const [articleData, allNewsData] = await Promise.all([
        getNewsBySlug(slug),
        getNewsList(),
      ]);

      setArticle(articleData);
      setAllNews(allNewsData);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    void loadArticle();
  }, [loadArticle]);

  const relatedArticles = useMemo(() => {
    if (!article) {
      return [];
    }

    return allNews
      .filter((item) => item.id !== article.id && item.category === article.category)
      .slice(0, 3);
  }, [article, allNews]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Container>
          <LoadingState label="Підвантажуємо статті..." />
        </Container>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.page}>
        <Container>
          <ErrorState
            title="Помилка завантаження статті"
            text="Здається, сталася помилка при завантаженні статті. Будь ласка, спробуйте ще раз."
            onRetry={loadArticle}
          />
        </Container>
      </div>
    );
  }

  if (!article) {
    return (
      <div className={styles.page}>
        <Container>
          <div className={styles.notFound}>
            <h1 className={styles.notFoundTitle}>Матеріали статтей не знайдені</h1>
            <p className={styles.notFoundText}>
              Матеріал, який ви намагаєтесь відкрити, не існує або був видалений.
            </p>
            <Button to="/news" variant="primary">
              Повернутися до новин
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Container>
        <article className={styles.article}>
          <div className={styles.top}>
            <span className={styles.category}>{article.category}</span>
            <h1 className={styles.title}>{article.title}</h1>
            <p className={styles.excerpt}>{article.excerpt}</p>

            <div className={styles.meta}>
              <span>By {article.author}</span>
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>

          <div className={styles.mediaWrap}>
            <img className={styles.image} src={article.image} alt={article.title} />
          </div>

          <div className={styles.contentWrap}>
            <div className={styles.content}>
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </div>
        </article>

        {relatedArticles.length > 0 && (
          <section className={styles.related}>
            <div className={styles.relatedHead}>
              <h2 className={styles.relatedTitle}>Також читайте</h2>
            </div>

            <div className={styles.relatedGrid}>
              {relatedArticles.map((item) => (
                <NewsCard key={item.id} article={item} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}