import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchTrigger from '../search/SearchTrigger';
import SearchModal from '../search/SearchModal';
import styles from './Header.module.css';

const SLIDE_NAVS = [
  { id: 'about', label: '关于', slideIndex: 1 },
  { id: 'process', label: '流程', slideIndex: 2 },
  { id: 'team', label: '团队', slideIndex: 3 },
];

const PAGE_NAVS = [
  { id: 'skills', label: '技能', path: '/skills' },
];

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSlide = (index: number) => {
    if (isHomePage) {
      const container = document.querySelector('[data-slide-container]');
      if (container) {
        const slide = container.children[index] as HTMLElement;
        slide?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#slide-${index}`);
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <Link to="/" className={styles.logo}>
          OpenCode
        </Link>

        <nav className={styles.nav}>
          {SLIDE_NAVS.map((nav) => (
            <button
              key={nav.id}
              className={styles.navItem}
              onClick={() => scrollToSlide(nav.slideIndex)}
              type="button"
            >
              {nav.label}
            </button>
          ))}
          {PAGE_NAVS.map((nav) => (
            <Link
              key={nav.id}
              to={nav.path}
              className={styles.navItem}
            >
              {nav.label}
            </Link>
          ))}
        </nav>

        <SearchTrigger onClick={() => setIsSearchOpen(true)} />

        <a
          href="https://github.com/Burburton/amazing-specialists"
          className={styles.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span className={styles.githubText}>GitHub</span>
        </a>

        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          type="button"
        >
          <span className={styles.hamburger}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </span>
        </button>

        <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
          {SLIDE_NAVS.map((nav) => (
            <button
              key={nav.id}
              className={styles.mobileNavItem}
              onClick={() => scrollToSlide(nav.slideIndex)}
              type="button"
            >
              {nav.label}
            </button>
          ))}
          {PAGE_NAVS.map((nav) => (
            <Link
              key={nav.id}
              to={nav.path}
              className={styles.mobileNavItem}
              onClick={closeMenu}
            >
              {nav.label}
            </Link>
          ))}
          <button
            className={styles.mobileNavItem}
            onClick={() => { setIsSearchOpen(true); closeMenu(); }}
            type="button"
          >
            🔍 搜索
          </button>
          <a
            href="https://github.com/Burburton/amazing-specialists"
            className={styles.mobileNavItem}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

export default Header;