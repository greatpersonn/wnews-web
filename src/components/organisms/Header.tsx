import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import { Logo } from '@/components/atoms/Logo';
import { ROUTES } from '@/shared/constants/routes';
import { useAuth } from '@/shared/hooks/useAuth';
import styles from './Header.module.scss';

const navItems = [
  { to: '/', label: 'Головна' },
  { to: '/news', label: 'Новини' },
  { to: '/issues', label: 'Випуски' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, signInWithGoogle, logout } = useAuth();

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 860) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', closeOnResize);
    return () => window.removeEventListener('resize', closeOnResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.topline}>
          <span className={styles.live}>Наживо</span>
          <span className={styles.text}>Діджитал-платформа мовлення Weazel News</span>
        </div>

        <div className={styles.inner}>
          <Logo />

          <nav className={styles.nav}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                {item.label}
              </NavLink>
            ))}

            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Панель керування
              </NavLink>
            )}
          </nav>

          <div className={styles.actions}>
            {user ? (
              <>
                <span className={styles.userEmail}>{user.email}</span>
                <Button variant="ghost" onClick={logout}>
                  Вийти з акаунту
                </Button>
              </>
            ) : (
              <Button variant="secondary" onClick={signInWithGoogle}>
                Вхід до акаунту
              </Button>
            )}
          </div>

          <button
            type="button"
            className={`${styles.burger} ${isOpen ? styles.burgerActive : ''}`}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </Container>

      <div className={`${styles.mobilePanel} ${isOpen ? styles.mobilePanelOpen : ''}`}>
        <Container>
          <div className={styles.mobileInner}>
            <nav className={styles.mobileNav}>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    isActive ? `${styles.mobileLink} ${styles.mobileActive}` : styles.mobileLink
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}

              {isAdmin && (
                <NavLink
                  to={ROUTES.home + 'admin'.replace(ROUTES.home, '/')}
                  className={({ isActive }) =>
                    isActive ? `${styles.mobileLink} ${styles.mobileActive}` : styles.mobileLink
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Панель керування
                </NavLink>
              )}
            </nav>

            {user ? (
              <div className={styles.mobileAuth}>
                <span className={styles.mobileEmail}>{user.email}</span>
                <Button variant="ghost" fullWidth onClick={logout}>
                  Вийти з акаунту
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                fullWidth
                onClick={async () => {
                  await signInWithGoogle();
                  setIsOpen(false);
                }}
              >
                Вхід до акаунту
              </Button>
            )}
          </div>
        </Container>
      </div>
    </header>
  );
}