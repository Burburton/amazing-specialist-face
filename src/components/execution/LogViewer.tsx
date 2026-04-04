import { useState } from 'react';
import type { LogEntry } from '../../types';
import styles from './LogViewer.module.css';

interface LogViewerProps {
  logs: LogEntry[];
  maxHeight?: string;
}

function LogViewer({ logs, maxHeight = '400px' }: LogViewerProps) {
  const [filter, setFilter] = useState<'all' | 'info' | 'warning' | 'error'>('all');
  const [search, setSearch] = useState('');

  const filteredLogs = logs.filter((log) => {
    if (filter !== 'all' && log.level !== filter) return false;
    if (search && !log.message.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className={styles.logViewer}>
      <div className={styles.controls}>
        <div className={styles.filters}>
          {(['all', 'info', 'warning', 'error'] as const).map((level) => (
            <button
              key={level}
              className={`${styles.filterBtn} ${filter === level ? styles.active : ''}`}
              onClick={() => setFilter(level)}
            >
              {level}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.logList} style={{ maxHeight }}>
        {filteredLogs.length === 0 ? (
          <div className={styles.empty}>No logs to display</div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log.id} className={`${styles.logEntry} ${styles[log.level]}`}>
              <span className={styles.timestamp}>{formatTime(log.timestamp)}</span>
              <span className={styles.level}>{log.level.toUpperCase()}</span>
              <span className={styles.message}>{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LogViewer;