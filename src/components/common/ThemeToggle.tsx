import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const icon = resolvedTheme === 'dark' ? '🌙' : '☀️';

  return (
    <div className={styles.container} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-label="Toggle theme"
        aria-expanded={isOpen}
      >
        {icon}
      </button>

      {isOpen && (
        <div className={styles.menu}>
          <button
            className={`${styles.option} ${theme === 'light' ? styles.active : ''}`}
            onClick={() => {
              setTheme('light');
              setIsOpen(false);
            }}
            type="button"
          >
            ☀️ Light
          </button>
          <button
            className={`${styles.option} ${theme === 'dark' ? styles.active : ''}`}
            onClick={() => {
              setTheme('dark');
              setIsOpen(false);
            }}
            type="button"
          >
            🌙 Dark
          </button>
          <button
            className={`${styles.option} ${theme === 'system' ? styles.active : ''}`}
            onClick={() => {
              setTheme('system');
              setIsOpen(false);
            }}
            type="button"
          >
            💻 System
          </button>
        </div>
      )}
    </div>
  );
}