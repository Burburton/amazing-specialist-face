import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import SearchResultItem from './SearchResultItem';
import styles from './SearchModal.module.css';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { query, setQuery, groupedResults } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  const handleSelect = useCallback((href: string) => {
    navigate(href);
    onClose();
  }, [navigate, onClose]);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      inputRef.current?.focus();
      setQuery('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      previousActiveElement.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, setQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasResults =
    groupedResults.skills.length > 0 ||
    groupedResults.roles.length > 0 ||
    groupedResults.contracts.length > 0 ||
    groupedResults.commands.length > 0;

  const totalResults =
    groupedResults.skills.length +
    groupedResults.roles.length +
    groupedResults.contracts.length +
    groupedResults.commands.length;

  let groupNumber = 1;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="button"
      tabIndex={-1}
      aria-label="Close search"
    >
      <div
        ref={modalRef}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
      >
        <h2 id="search-modal-title" className="visually-hidden">
          Search skills, roles, contracts, and commands
        </h2>
        <div className={styles.searchInputWrapper}>
          <span className={styles.searchIcon} aria-hidden="true">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="搜索 skills, roles, contracts, commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
            aria-describedby={query.trim() && !hasResults ? 'no-results-message' : undefined}
          />
          <kbd className={styles.shortcut} aria-hidden="true">ESC</kbd>
        </div>

        <div className={styles.results} role="region" aria-live="polite" aria-label="Search results">
          {query.trim() && !hasResults && (
            <div id="no-results-message" className={styles.noResults} role="status">
              无匹配结果
            </div>
          )}

          {hasResults && (
            <div className="visually-hidden" role="status">
              {totalResults} results found
            </div>
          )}

          {groupedResults.skills.length > 0 && (
            <div className={styles.resultGroup}>
              <div className={styles.groupHeader}>
                <span className={styles.groupNumber}>{String(groupNumber++).padStart(2, '0')}</span>
                <h3 className={styles.groupTitle}>Skills</h3>
                <span className={styles.groupCount}>{groupedResults.skills.length}</span>
              </div>
              {groupedResults.skills.map((result) => (
                <SearchResultItem key={result.id} result={result} onSelect={handleSelect} />
              ))}
            </div>
          )}

          {groupedResults.roles.length > 0 && (
            <div className={styles.resultGroup}>
              <div className={styles.groupHeader}>
                <span className={styles.groupNumber}>{String(groupNumber++).padStart(2, '0')}</span>
                <h3 className={styles.groupTitle}>Roles</h3>
                <span className={styles.groupCount}>{groupedResults.roles.length}</span>
              </div>
              {groupedResults.roles.map((result) => (
                <SearchResultItem key={result.id} result={result} onSelect={handleSelect} />
              ))}
            </div>
          )}

          {groupedResults.contracts.length > 0 && (
            <div className={styles.resultGroup}>
              <div className={styles.groupHeader}>
                <span className={styles.groupNumber}>{String(groupNumber++).padStart(2, '0')}</span>
                <h3 className={styles.groupTitle}>Contracts</h3>
                <span className={styles.groupCount}>{groupedResults.contracts.length}</span>
              </div>
              {groupedResults.contracts.map((result) => (
                <SearchResultItem key={result.id} result={result} onSelect={handleSelect} />
              ))}
            </div>
          )}

          {groupedResults.commands.length > 0 && (
            <div className={styles.resultGroup}>
              <div className={styles.groupHeader}>
                <span className={styles.groupNumber}>{String(groupNumber++).padStart(2, '0')}</span>
                <h3 className={styles.groupTitle}>Commands</h3>
                <span className={styles.groupCount}>{groupedResults.commands.length}</span>
              </div>
              {groupedResults.commands.map((result) => (
                <SearchResultItem key={result.id} result={result} onSelect={handleSelect} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}