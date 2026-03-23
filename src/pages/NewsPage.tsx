import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import { SectionSubtitle } from '@/components/atoms/SectionSubtitle';
import { SectionTitle } from '@/components/atoms/SectionTitle';
import { CategoryFilter } from '@/components/molecules/CategoryFilter';
import { NewsCard } from '@/components/molecules/NewsCard';
import { NewsSearch } from '@/components/molecules/NewsSearch';
import { getNewsList } from '@/entities/news/api/news.service';
import type { NewsArticle } from '@/entities/news/model/types';
import { EmptyState } from '@/widgets/states/EmptyState';
import { ErrorState } from '@/widgets/states/ErrorState';
import { LoadingState } from '@/widgets/states/LoadingState';
import styles from './NewsPage.module.scss';

const ALL_CATEGORY = 'Всі';
const INITIAL_VISIBLE_COUNT = 4;
const LOAD_MORE_STEP = 4;

export function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);
  const [searchValue, setSearchValue] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadNews = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await getNewsList();
      setNews(data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNews();
  }, [loadNews]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(news.map((item) => item.category)));
    return [ALL_CATEGORY, ...uniqueCategories];
  }, [news]);

  const filteredNews = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return news.filter((item) => {
      const matchesCategory =
        activeCategory === ALL_CATEGORY || item.category === activeCategory;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        item.title.toLowerCase().includes(normalizedSearch) ||
        item.excerpt.toLowerCase().includes(normalizedSearch) ||
        item.author.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [news, activeCategory, searchValue]);

  const visibleNews = useMemo(() => {
    return filteredNews.slice(0, visibleCount);
  }, [filteredNews, visibleCount]);

  const hasMore = visibleCount < filteredNews.length;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_STEP);
  };

  const resetFilters = () => {
    setSearchValue('');
    setActiveCategory(ALL_CATEGORY);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.head}>
          <SectionTitle>Усі публікації</SectionTitle>
          <SectionSubtitle>
            Останні новини, гарячі зведення, ексклюзивні інтерв'ю та міські апдейти в одному місці.
          </SectionSubtitle>
        </div>

        <div className={styles.toolbar}>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onChange={handleCategoryChange}
          />

          <NewsSearch value={searchValue} onChange={handleSearchChange} />
        </div>

        {isLoading ? (
          <LoadingState label="Завантажуємо новини..." />
        ) : isError ? (
          <ErrorState
            title="Помилка завантаження"
            text="Нажаль, зараз ми не можемо отримати доступ до стрічки новин."
            onRetry={loadNews}
          />
        ) : visibleNews.length > 0 ? (
          <>
            <div className={styles.grid}>
              {visibleNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>

            {hasMore && (
              <div className={styles.loadMore}>
                <Button variant="secondary" onClick={handleLoadMore}>
                  Більше новин
                </Button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title="Пошук не дав результатів"
            text="Спробуйте іншу категорію або змініть параметри пошуку. Можливо просто стрічка заглючила і новин нема..."
            actionLabel="Скинути фільтри"
            onAction={resetFilters}
          />
        )}
      </Container>
    </div>
  );
}