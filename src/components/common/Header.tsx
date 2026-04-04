import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/skills', label: 'Skills' },
  { path: '/roles', label: 'Roles' },
  { path: '/contracts', label: 'Contracts' },
  { path: '/commands', label: 'Commands' },
  { path: '/execution', label: 'Execution' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>📚</span>
        <span className={styles.logoText}>Expert Pack</span>
      </div>

      <nav className={styles.nav}>
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button
        className={styles.menuButton}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span className={styles.hamburger}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </span>
      </button>

      <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink
            }
            onClick={closeMenu}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;