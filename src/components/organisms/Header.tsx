import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import { Logo } from '@/components/atoms/Logo';
import styles from './Header.module.scss';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/news', label: 'News' },
  { to: '/issues', label: 'Issues' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
          <span className={styles.live}>Live</span>
          <span className={styles.text}>Weazel News digital broadcasting platform</span>
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
          </nav>

          <div className={styles.actions}>
            <Button to="/issues" variant="secondary">
              Read Issues
            </Button>
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
            </nav>

            <Button to="/issues" variant="primary" fullWidth>
              Open Latest Issues
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}