import type { SearchResult } from '../../types/search';
import Icon, { type IconName } from '../common/Icon';
import styles from './SearchResultItem.module.css';

interface SearchResultItemProps {
  result: SearchResult;
  onSelect: (href: string) => void;
}

const TYPE_ICONS: Record<string, IconName> = {
  skill: 'skills',
  role: 'roles',
  contract: 'contracts',
  command: 'commands',
};

export default function SearchResultItem({ result, onSelect }: SearchResultItemProps) {
  const iconName: IconName = (result.metadata?.role as IconName) || TYPE_ICONS[result.type] || 'common';

  return (
    <div className={styles.resultItem} onClick={() => onSelect(result.href)}>
      <div className={`${styles.typeIcon} ${styles[result.type]}`}>
        <Icon name={iconName} size={20} />
      </div>
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
      <Icon name="arrow-right" size={16} />
    </div>
  );
}