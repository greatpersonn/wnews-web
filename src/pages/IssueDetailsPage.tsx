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
          <LoadingState label="Loading issue..." />
        </Container>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.page}>
        <Container>
          <ErrorState
            title="Failed to load issue"
            text="The requested publication could not be loaded."
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
            <h1 className={styles.notFoundTitle}>Issue not found</h1>
            <p className={styles.notFoundText}>
              The issue you are trying to open does not exist or is unavailable.
            </p>
            <Button to="/issues">Back to issues</Button>
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
            <span className={styles.number}>Issue #{issue.issueNumber}</span>

            <h1 className={styles.title}>{issue.title}</h1>
            <p className={styles.description}>{issue.description}</p>

            <div className={styles.meta}>
              <span>Published: {formatDate(issue.publishedAt)}</span>
              <span>Pages: {issue.pages.length}</span>
            </div>

            <div className={styles.buttons}>
              <Button to="/issues" variant="secondary">
                Back to issues
              </Button>
            </div>
          </div>
        </div>

        <IssueViewer issue={issue} />
      </Container>
    </div>
  );
}