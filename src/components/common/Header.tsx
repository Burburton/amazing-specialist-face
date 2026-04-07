import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchTrigger from '../search/SearchTrigger';
import SearchModal from '../search/SearchModal';
import ThemeToggle from './ThemeToggle';
import Icon from './Icon';
import styles from './Header.module.css';

const SLIDE_NAVS = [
  { id: 'about', label: '关于', slideIndex: 1 },
  { id: 'process', label: '流程', slideIndex: 2 },
  { id: 'team', label: '团队', slideIndex: 3 },
];

const PAGE_NAVS = [
  { id: 'tutorial', label: '教程', path: '/tutorial' },
  { id: 'cases', label: '案例', path: '/cases' },
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
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
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
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`} role="banner">
        <Link to="/" className={styles.logo} aria-label="OpenCode home">
          OpenCode
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
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

        <ThemeToggle />

        <a
          href="https://github.com/Burburton/amazing-specialists"
          className={styles.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Icon name="github" size={20} />
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

        <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`} aria-label="Mobile navigation" aria-hidden={!isMenuOpen}>
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
            <Icon name="search" size={16} /> 搜索
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