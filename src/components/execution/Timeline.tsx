import type { ExecutionPhase, Role } from '../../types';
import styles from './Timeline.module.css';

interface TimelineProps {
  phases: ExecutionPhase[];
  currentPhase?: Role;
}

const ROLE_ORDER: Role[] = ['architect', 'developer', 'tester', 'reviewer', 'docs', 'security'];

const ROLE_LABELS: Record<Role, string> = {
  architect: 'Architect',
  developer: 'Developer',
  tester: 'Tester',
  reviewer: 'Reviewer',
  docs: 'Docs',
  security: 'Security',
};

function Timeline({ phases, currentPhase }: TimelineProps) {
  const phaseMap = new Map(phases.map((p) => [p.role, p]));

  const formatDuration = (ms?: number) => {
    if (!ms) return '';
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  return (
    <div className={styles.timeline}>
      <div className={styles.timelineTrack}>
        {ROLE_ORDER.map((role, index) => {
          const phase = phaseMap.get(role);
          const isCurrent = currentPhase === role;
          const status = phase?.status || 'pending';
          const number = String(index + 1).padStart(2, '0');

          return (
            <div
              key={role}
              className={`${styles.phase} ${styles[status]} ${isCurrent ? styles.current : ''}`}
            >
              <div className={styles.phaseNode}>
                <div className={styles.phaseDot} />
                {index < ROLE_ORDER.length - 1 && <div className={styles.phaseConnector} />}
              </div>
              <div className={styles.phaseContent}>
                <span className={styles.phaseNumber}>{number}</span>
                <span className={styles.phaseLabel}>{ROLE_LABELS[role]}</span>
                {phase?.duration && (
                  <span className={styles.phaseDuration}>{formatDuration(phase.duration)}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Timeline;