import type { SearchResult } from '../../types/search';
import styles from './SearchResultItem.module.css';

interface SearchResultItemProps {
  result: SearchResult;
  onSelect: (href: string) => void;
}

const TYPE_ICONS: Record<string, string> = {
  skill: '⚡',
  role: '🎭',
  contract: '📋',
  command: '▶️',
};

export default function SearchResultItem({ result, onSelect }: SearchResultItemProps) {
  const icon = result.metadata?.emoji || TYPE_ICONS[result.type];

  return (
    <div className={styles.resultItem} onClick={() => onSelect(result.href)}>
      <div className={`${styles.typeIcon} ${styles[result.type]}`}>{icon}</div>
      <div className={styles.content}>
        <div className={styles.name}>{result.name}</div>
        <div className={styles.description}>{result.description}</div>
        {result.metadata && (
          <div className={styles.metadata}>
            {result.metadata.role && (
              <span className={styles.tag}>{result.metadata.role}</span>
            )}
            {result.metadata.category && (
              <span className={styles.tag}>{result.metadata.category}</span>
            )}
            {result.metadata.contractId && (
              <span className={styles.tag}>{result.metadata.contractId}</span>
            )}
          </div>
        )}
      </div>
      <span className={styles.arrow}>→</span>
    </div>
  );
}