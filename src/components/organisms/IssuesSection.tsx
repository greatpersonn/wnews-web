import type { NewspaperIssue } from '@/shared/types/issue';
import { Container } from '@/components/atoms/Container';
import { SectionTitle } from '@/components/atoms/SectionTitle';
import { IssueCard } from '@/components/molecules/IssueCard';
import styles from './IssuesSection.module.scss';

interface IssuesSectionProps {
  items: NewspaperIssue[];
}

export function IssuesSection({ items }: IssuesSectionProps) {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.head}>
          <SectionTitle>Останні випуски</SectionTitle>
          <p className={styles.subtitle}>
            Випуски газет, спеціальні звіти та візуальні публікації з Weazel News.
          </p>
        </div>

        <div className={styles.grid}>
          {items.map((item) => (
            <IssueCard key={item.id} issue={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}