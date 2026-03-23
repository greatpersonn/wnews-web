import { Link } from 'react-router-dom';
import { Container } from '@/components/atoms/Container';
import styles from './Footer.module.scss';

const navigation = [
  { to: '/', label: 'Home' },
  { to: '/news', label: 'News' },
  { to: '/issues', label: 'Issues' },
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
              Digital city news platform with breaking reports, feature stories, magazine
              issues, and visual publications from Los Santos.
            </p>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Navigation</h3>
            <div className={styles.links}>
              {navigation.map((item) => (
                <Link key={item.to} to={item.to} className={styles.link}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Editorial Desk</h3>
            <div className={styles.info}>
              <span>Daily live updates</span>
              <span>Special issues and reports</span>
              <span>City, media, business, lifestyle</span>
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