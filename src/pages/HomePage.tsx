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
import type { AdItem } from '@/entities/ad/model/types';
import { AdsSidebar } from '@/components/organisms/AdsSidebar';
import { getActiveAdsList } from '@/entities/ad/api/ads.service';
import styles from './HomePage.module.scss';

export function HomePage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [issues, setIssues] = useState<NewspaperIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [ads, setAds] = useState<AdItem[]>([]);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const [newsData, issuesData, adsData] = await Promise.all([
        getNewsList(),
        getIssuesList(),
        getActiveAdsList(),
      ]);

      setAds(adsData);
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
          <LoadingState label="Зачекайте, фарба в принтері закінчилась..." />
        </div>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <div className={styles.stateWrap}>
          <ErrorState
            title="Помилка завантаження головної сторінки"
            text="Щось пішло не так. Останні новини поки що недоступні."
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
  const homepageAds = ads.slice(0, 2);

  if (!featured) {
    return (
      <Container>
        <div className={styles.stateWrap}>
          <ErrorState
            title="Стрічка новин пустує..."
            text="Поки що немає контенту, який ми можем вам порекомендувати!"
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
              <AdsSidebar items={homepageAds} />
            </div>
          </div>
        </Container>
      </section>

      <IssuesSection items={latestIssues} />
    </div>
  );
}