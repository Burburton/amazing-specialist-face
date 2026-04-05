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

  const scrollToTasks = () => {
    const tasksSection = document.querySelector('[data-tasks-section]');
    tasksSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.container} data-execution-container>
      <section className={styles.overviewSection}>
        <div className={styles.overviewContent}>
          <h1 className={styles.pageTitle}>Execution</h1>
          <p className={styles.subtitle}>Real-time Task Monitor</p>
          <StatsOverview stats={stats} />
          <button className={styles.scrollHint} onClick={scrollToTasks} type="button">
            View Tasks ↓
          </button>
        </div>
      </section>

      <section className={styles.tasksSection} data-tasks-section>
        <div className={styles.sectionContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Tasks</h2>
            <span className={styles.taskCount}>{filteredTasks.length}</span>
          </div>

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
      </section>

      {selectedTask && (
        <section className={styles.detailSection}>
          <div className={styles.sectionContent}>
            <div className={styles.detailHeader}>
              <h2 className={styles.sectionTitle}>
                {selectedTask.task_id}: {selectedTask.title}
              </h2>
              <button
                className={styles.closeButton}
                onClick={() => setSelectedTask(null)}
                type="button"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {selectedTask.phases.length > 0 && (
              <div className={styles.detailBlock}>
                <h3 className={styles.detailLabel}>Execution Timeline</h3>
                <Timeline phases={selectedTask.phases} currentPhase="developer" />
              </div>
            )}

            {selectedTask.dispatch_payload && (
              <div className={styles.detailBlock}>
                <h3 className={styles.detailLabel}>Dispatch Payload</h3>
                <PayloadViewer payload={selectedTask.dispatch_payload} />
              </div>
            )}

            {selectedTask.logs.length > 0 && (
              <div className={styles.detailBlock}>
                <h3 className={styles.detailLabel}>Execution Logs</h3>
                <LogViewer logs={selectedTask.logs} />
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default ExecutionPage;