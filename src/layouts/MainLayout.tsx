import { Outlet } from 'react-router-dom';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import styles from './MainLayout.module.scss';

export function MainLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}