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
          <SectionTitle>Newspaper Issues</SectionTitle>
          <SectionSubtitle>
            Browse the latest Weazel News editions, magazine-style reports, and special
            issues.
          </SectionSubtitle>
        </div>

        {isLoading ? (
          <LoadingState label="Loading issues..." />
        ) : isError ? (
          <ErrorState
            title="Failed to load issues"
            text="We could not retrieve the publication archive."
            onRetry={loadIssues}
          />
        ) : (
          <div className={styles.grid}>
            {issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}