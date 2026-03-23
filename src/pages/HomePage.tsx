import { useCallback, useEffect, useState } from 'react';
import { Container } from '@/components/atoms/Container';
import { BreakingNewsTicker } from '@/components/molecules/BreakingNewsTicker';
import { getIssuesList } from '@/entities/issue/api/issues.service';
import type { NewspaperIssue } from '@/entities/issue/model/types';
import { getNewsList } from '@/entities/news/api/news.service';
import type { NewsArticle } from '@/entities/news/model/types';
import { HeroFeatured } from '@/components/organisms/HeroFeatured';
import { IssuesSection } from '@/components/organisms/IssuesSection';
import { LatestNewsSection } from '@/components/organisms/LatestNewsSection';
import { TopStoriesSidebar } from '@/components/organisms/TopStoriesSidebar';
import { ErrorState } from '@/widgets/states/ErrorState';
import { LoadingState } from '@/widgets/states/LoadingState';
import styles from './HomePage.module.scss';

export function HomePage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [issues, setIssues] = useState<NewspaperIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const [newsData, issuesData] = await Promise.all([getNewsList(), getIssuesList()]);

      setNews(newsData);
      setIssues(issuesData);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  if (isLoading) {
    return (
      <Container>
        <div className={styles.stateWrap}>
          <LoadingState label="Loading homepage..." />
        </div>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <div className={styles.stateWrap}>
          <ErrorState
            title="Failed to load homepage"
            text="We could not load the latest stories and issues."
            onRetry={loadData}
          />
        </div>
      </Container>
    );
  }

  const featured = news.find((item) => item.featured) ?? news[0];
  const latestNews = news.slice(0, 4);
  const topStories = news.slice(0, 4);
  const latestIssues = issues.slice(0, 3);

  if (!featured) {
    return (
      <Container>
        <div className={styles.stateWrap}>
          <ErrorState
            title="No featured article"
            text="There is no featured content available yet."
          />
        </div>
      </Container>
    );
  }

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.ticker}>
          <BreakingNewsTicker items={news} />
        </div>
      </Container>

      <HeroFeatured article={featured} />

      <section className={styles.newsSection}>
        <Container>
          <div className={styles.newsLayout}>
            <div className={styles.mainColumn}>
              <LatestNewsSection items={latestNews} />
            </div>

            <div className={styles.sideColumn}>
              <TopStoriesSidebar items={topStories} />
            </div>
          </div>
        </Container>
      </section>

      <IssuesSection items={latestIssues} />
    </div>
  );
}