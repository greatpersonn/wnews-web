import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

export function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <span className={styles.weazel}>WEAZEL</span>
      <span className={styles.news}>NEWS</span>
    </Link>
  );
}