import type { AdItem } from '@/entities/ad/model/types';
import styles from './AdCard.module.scss';

interface AdCardProps {
  item: AdItem;
}

export function AdCard({ item }: AdCardProps) {
  const Wrapper = item.link ? 'a' : 'div';

  return (
    <Wrapper
      {...(item.link
        ? {
            href: item.link,
            target: '_blank',
            rel: 'noreferrer',
          }
        : {})}
      className={styles.card}
    >
      <div className={styles.imageWrap}>
        <img src={item.image} alt={item.title} className={styles.image} />
      </div>

      <div className={styles.body}>
        <span className={styles.category}>{item.category}</span>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
        <div className={styles.footer}>
          <span className={styles.contact}>{item.contact}</span>
        </div>
      </div>
    </Wrapper>
  );
}