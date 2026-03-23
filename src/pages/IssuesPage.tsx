import { useCallback, useEffect, useState } from 'react';
import { Container } from '@/components/atoms/Container';
import { SectionSubtitle } from '@/components/atoms/SectionSubtitle';
import { SectionTitle } from '@/components/atoms/SectionTitle';
import { IssueCard } from '@/components/molecules/IssueCard';
import { getIssuesList } from '@/entities/issue/api/issues.service';
import type { NewspaperIssue } from '@/entities/issue/model/types';
import { ErrorState } from '@/widgets/states/ErrorState';
import { LoadingState } from '@/widgets/states/LoadingState';
import styles from './IssuesPage.module.scss';
import { EmptyState } from '@/widgets/states/EmptyState';

export function IssuesPage() {
  const [issues, setIssues] = useState<NewspaperIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadIssues = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await getIssuesList();
      setIssues(data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadIssues();
  }, [loadIssues]);

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.head}>
          <SectionTitle>Останні випуски</SectionTitle>
          <SectionSubtitle>
            Обирай свій формат: свіжі номери Weazel News, журнальні звіти та ексклюзивні випуски.
          </SectionSubtitle>
        </div>

        {isLoading ? (
          <LoadingState label="Завантажуємо випуски..." />
        ) : isError ? (
          <ErrorState
            title="Помилка завантаження"
            text="Наразі випуски газет, журналів та інших брошюр недоступний."
            onRetry={loadIssues}
          />
        ) : issues.length > 0 ? (
          <div className={styles.grid}>
            {issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Всі газети знесло вітром... Наразі тут пусто"
            text="Спробуйте завітати до цього розділу пізніше! Наші редактори працюють не покладаючи рук!"
          />
        )}
      </Container>
    </div>
  );
}