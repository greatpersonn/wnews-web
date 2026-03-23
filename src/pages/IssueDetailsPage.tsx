import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import { IssueViewer } from '@/components/organisms/IssueViewer';
import { getIssueBySlug } from '@/entities/issue/api/issues.service';
import type { NewspaperIssue } from '@/entities/issue/model/types';
import { formatDate } from '@/shared/lib/formatDate';
import { ErrorState } from '@/widgets/states/ErrorState';
import { LoadingState } from '@/widgets/states/LoadingState';
import styles from './IssueDetailsPage.module.scss';

export function IssueDetailsPage() {
  const { slug = '' } = useParams();
  const [issue, setIssue] = useState<NewspaperIssue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadIssue = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const issueData = await getIssueBySlug(slug);
      setIssue(issueData);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    void loadIssue();
  }, [loadIssue]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Container>
          <LoadingState label="Завантажуємо випуск..." />
        </Container>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.page}>
        <Container>
          <ErrorState
            title="Не вдалося завантажити випуск"
            text="Запитана публікація наразі недоступна."
            onRetry={loadIssue}
          />
        </Container>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className={styles.page}>
        <Container>
          <div className={styles.notFound}>
            <h1 className={styles.notFoundTitle}>Випуск не знайдений або видалений</h1>
            <p className={styles.notFoundText}>
              Цей випуск не знайдено або він наразі недоступний.
            </p>
            <Button to="/issues">Повернутись до всіх випусків</Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.hero}>
          <div className={styles.coverWrap}>
            <img src={issue.cover} alt={issue.title} className={styles.cover} />
          </div>

          <div className={styles.info}>
            <span className={styles.category}>{issue.category}</span>
            <span className={styles.number}>Випуск №{issue.issueNumber}</span>

            <h1 className={styles.title}>{issue.title}</h1>
            <p className={styles.description}>{issue.description}</p>

            <div className={styles.meta}>
              <span>Опублікований: {formatDate(issue.publishedAt)}</span>
              <span>Сторінок: {issue.pages.length}</span>
            </div>

            <div className={styles.buttons}>
              <Button to="/issues" variant="secondary">
                Повернутись до всіх випусків
              </Button>
            </div>
          </div>
        </div>

        <IssueViewer issue={issue} />
      </Container>
    </div>
  );
}