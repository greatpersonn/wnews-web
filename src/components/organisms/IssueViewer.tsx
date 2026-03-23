import { useMemo, useState } from 'react';
import { Button } from '@/components/atoms/Button';
import type { NewspaperIssue } from '@/shared/types/issue';
import styles from './IssueViewer.module.scss';

interface IssueViewerProps {
  issue: NewspaperIssue;
}

export function IssueViewer({ issue }: IssueViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentPage = useMemo(() => issue.pages[activeIndex], [issue.pages, activeIndex]);

  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < issue.pages.length - 1;

  const handlePrev = () => {
    if (canGoPrev) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.viewer}>
      <div className={styles.topbar}>
        <div className={styles.pageInfo}>
          <span className={styles.pageLabel}>Сторінка №</span>
          <span className={styles.pageCounter}>
            {activeIndex + 1} / {issue.pages.length}
          </span>
          {currentPage.title && <span className={styles.pageTitle}>{currentPage.title}</span>}
        </div>

        <div className={styles.actions}>
          <Button variant="ghost" onClick={handlePrev} disabled={!canGoPrev}>
            Попередня
          </Button>
          <Button variant="primary" onClick={handleNext} disabled={!canGoNext}>
            Наступна
          </Button>
        </div>
      </div>

      <div className={styles.stage}>
        <img
          src={currentPage.image}
          alt={currentPage.title ?? `${issue.title} page ${activeIndex + 1}`}
          className={styles.pageImage}
        />
      </div>

      <div className={styles.thumbs}>
        {issue.pages.map((page, index) => (
          <button
            key={page.id}
            type="button"
            className={`${styles.thumb} ${index === activeIndex ? styles.thumbActive : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <img
              src={page.image}
              alt={page.title ?? `Page ${index + 1}`}
              className={styles.thumbImage}
            />
            <span className={styles.thumbLabel}>{index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}