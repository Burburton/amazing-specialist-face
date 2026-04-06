import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import Icon from './Icon';
import type { IconName } from './Icon';
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

  const iconName: IconName = resolvedTheme === 'dark' ? 'moon' : 'sun';
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
        <Icon name={iconName} size={20} />
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
            <Icon name="sun" size={18} /> Light
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
            <Icon name="moon" size={18} /> Dark
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
            <Icon name="system" size={18} /> System
          </button>
        </div>
      )}
    </div>
  );
}