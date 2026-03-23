import { Link } from 'react-router-dom';
import { Container } from '@/components/atoms/Container';
import styles from './Footer.module.scss';

const navigation = [
  { to: '/', label: 'Головна' },
  { to: '/news', label: 'Новини' },
  { to: '/issues', label: 'Випуски' },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <h2 className={styles.logo}>
              <span className={styles.weazel}>WEAZEL</span>{' '}
              <span className={styles.news}>NEWS</span>
            </h2>
            <p className={styles.description}>
              Міська онлайн-платформа новин із гарячими репортажами, авторськими статтями, свіжими випусками журналів та яскравими фотографіями з усього Сан-Андреаса.
            </p>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Навігація</h3>
            <div className={styles.links}>
              {navigation.map((item) => (
                <Link key={item.to} to={item.to} className={styles.link}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Редакція</h3>
            <div className={styles.info}>
              <span>Щоденні живі оновлення</span>
              <span>Спеціальні випуски та звіти</span>
              <span>Місто, медіа, бізнес, стиль життя</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© 2026 Weazel News. All rights reserved.</p>
          <p className={styles.note}>Made for the GTA V roleplay media universe.</p>
        </div>
      </Container>
    </footer>
  );
}