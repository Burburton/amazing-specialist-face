import { useState, useMemo } from 'react';
import StatsOverview from '../components/execution/StatsOverview';
import TaskCard from '../components/execution/TaskCard';
import Timeline from '../components/execution/Timeline';
import LogViewer from '../components/execution/LogViewer';
import PayloadViewer from '../components/execution/PayloadViewer';
import mockTasks from '../data/mock-executions';
import type { Task, ExecutionStats, TaskFilter } from '../types';
import styles from './ExecutionPage.module.css';

function ExecutionPage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<TaskFilter>({});

  const stats: ExecutionStats = useMemo(() => {
    return {
      total: mockTasks.length,
      pending: mockTasks.filter((t) => t.status === 'pending').length,
      inProgress: mockTasks.filter((t) => t.status === 'in-progress').length,
      success: mockTasks.filter((t) => t.status === 'success').length,
      failed: mockTasks.filter((t) => t.status === 'failed').length,
      blocked: mockTasks.filter((t) => t.status === 'blocked').length,
    };
  }, []);

  const filteredTasks = useMemo(() => {
    return mockTasks.filter((task) => {
      if (filter.status && task.status !== filter.status) return false;
      if (filter.role && task.role !== filter.role) return false;
      if (filter.milestone && task.milestone !== filter.milestone) return false;
      if (filter.search && !task.title.toLowerCase().includes(filter.search.toLowerCase())) return false;
      return true;
    });
  }, [filter]);

  return (
    <div className={styles.executionPage}>
      <h1 className={styles.pageTitle}>Execution Monitor</h1>

      <StatsOverview stats={stats} />

      <div className={styles.filterBar}>
        <select
          value={filter.status || ''}
          onChange={(e) => setFilter({ ...filter, status: e.target.value as TaskFilter['status'] || undefined })}
          className={styles.filterSelect}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
          <option value="blocked">Blocked</option>
        </select>
        <input
          type="text"
          placeholder="Search tasks..."
          value={filter.search || ''}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.taskList}>
          <h2 className={styles.sectionTitle}>Tasks ({filteredTasks.length})</h2>
          <div className={styles.taskGrid}>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => setSelectedTask(selectedTask?.id === task.id ? null : task)}
              />
            ))}
          </div>
        </div>

        {selectedTask && (
          <div className={styles.taskDetail}>
            <h2 className={styles.sectionTitle}>{selectedTask.task_id}: {selectedTask.title}</h2>

            {selectedTask.phases.length > 0 && (
              <div className={styles.detailSection}>
                <h3 className={styles.detailTitle}>Execution Timeline</h3>
                <Timeline phases={selectedTask.phases} currentPhase="developer" />
              </div>
            )}

            {selectedTask.dispatch_payload && (
              <div className={styles.detailSection}>
                <h3 className={styles.detailTitle}>Dispatch Payload</h3>
                <PayloadViewer payload={selectedTask.dispatch_payload} />
              </div>
            )}

            {selectedTask.logs.length > 0 && (
              <div className={styles.detailSection}>
                <h3 className={styles.detailTitle}>Execution Logs</h3>
                <LogViewer logs={selectedTask.logs} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExecutionPage;