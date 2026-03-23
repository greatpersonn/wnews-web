import { Link } from 'react-router-dom';
import type { NewspaperIssue } from '@/shared/types/issue';
import styles from './IssueCard.module.scss';

interface IssueCardProps {
  issue: NewspaperIssue;
}

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <article className={styles.card}>
      <Link to={`/issues/${issue.slug}`} className={styles.link}>
        <div className={styles.coverWrap}>
          <img src={issue.cover} alt={issue.title} className={styles.cover} />
        </div>

        <div className={styles.body}>
          <span className={styles.number}>Випуск #{issue.issueNumber}</span>
          <h3 className={styles.title}>{issue.title}</h3>
          <p className={styles.description}>{issue.description}</p>

          <div className={styles.meta}>
            <span>{issue.publishedAt}</span>
            <span>{issue.category}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}