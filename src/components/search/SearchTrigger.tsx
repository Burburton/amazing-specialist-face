import Icon from '../common/Icon';
import styles from './SearchTrigger.module.css';

interface SearchTriggerProps {
  onClick: () => void;
}

export default function SearchTrigger({ onClick }: SearchTriggerProps) {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const shortcut = isMac ? '⌘K' : 'Ctrl+K';

  return (
    <button className={styles.trigger} onClick={onClick} type="button" aria-label="Open search">
      <Icon name="search" size={20} />
      <span className={styles.text}>搜索</span>
      <kbd className={styles.shortcut}>{shortcut}</kbd>
    </button>
  );
}