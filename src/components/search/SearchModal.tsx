import { useEffect, useRef } from 'react';
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
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
    }
  }, [isOpen, setQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelect = (href: string) => {
    navigate(href);
    onClose();
  };

  if (!isOpen) return null;

  const hasResults =
    groupedResults.skills.length > 0 ||
    groupedResults.roles.length > 0 ||
    groupedResults.contracts.length > 0 ||
    groupedResults.commands.length > 0;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchInputWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="搜索 skills, roles, contracts, commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className={styles.shortcut}>ESC</kbd>
        </div>

        <div className={styles.results}>
          {query.trim() && !hasResults && (
            <div className={styles.noResults}>无匹配结果</div>
          )}

          {groupedResults.skills.length > 0 && (
            <div className={styles.resultGroup}>
              <h3 className={styles.groupTitle}>Skills ({groupedResults.skills.length})</h3>
              {groupedResults.skills.map((result) => (
                <SearchResultItem key={result.id} result={result} onSelect={handleSelect} />
              ))}
            </div>
          )}

          {groupedResults.roles.length > 0 && (
            <div className={styles.resultGroup}>
              <h3 className={styles.groupTitle}>Roles ({groupedResults.roles.length})</h3>
              {groupedResults.roles.map((result) => (
                <SearchResultItem key={result.id} result={result} onSelect={handleSelect} />
              ))}
            </div>
          )}

          {groupedResults.contracts.length > 0 && (
            <div className={styles.resultGroup}>
              <h3 className={styles.groupTitle}>Contracts ({groupedResults.contracts.length})</h3>
              {groupedResults.contracts.map((result) => (
                <SearchResultItem key={result.id} result={result} onSelect={handleSelect} />
              ))}
            </div>
          )}

          {groupedResults.commands.length > 0 && (
            <div className={styles.resultGroup}>
              <h3 className={styles.groupTitle}>Commands ({groupedResults.commands.length})</h3>
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