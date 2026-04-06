import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const icon = resolvedTheme === 'dark' ? '🌙' : '☀️';
  const themeLabel = theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light';

  return (
    <div className={styles.container} ref={ref}>
      <button
        ref={triggerRef}
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-label={`Current theme: ${themeLabel}. Click to change theme.`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {icon}
      </button>

      {isOpen && (
        <div className={styles.menu} role="menu" aria-label="Theme options">
          <button
            className={`${styles.option} ${theme === 'light' ? styles.active : ''}`}
            onClick={() => {
              setTheme('light');
              setIsOpen(false);
              triggerRef.current?.focus();
            }}
            type="button"
            role="menuitemradio"
            aria-checked={theme === 'light'}
          >
            ☀️ Light
          </button>
          <button
            className={`${styles.option} ${theme === 'dark' ? styles.active : ''}`}
            onClick={() => {
              setTheme('dark');
              setIsOpen(false);
              triggerRef.current?.focus();
            }}
            type="button"
            role="menuitemradio"
            aria-checked={theme === 'dark'}
          >
            🌙 Dark
          </button>
          <button
            className={`${styles.option} ${theme === 'system' ? styles.active : ''}`}
            onClick={() => {
              setTheme('system');
              setIsOpen(false);
              triggerRef.current?.focus();
            }}
            type="button"
            role="menuitemradio"
            aria-checked={theme === 'system'}
          >
            💻 System
          </button>
        </div>
      )}
    </div>
  );
}