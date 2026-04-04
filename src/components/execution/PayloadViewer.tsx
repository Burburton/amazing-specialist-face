import { useState } from 'react';
import type { DispatchPayload } from '../../types';
import styles from './PayloadViewer.module.css';

interface PayloadViewerProps {
  payload: DispatchPayload;
}

function PayloadViewer({ payload }: PayloadViewerProps) {
  const [view, setView] = useState<'structured' | 'json'>('structured');

  const keyFields = [
    { key: 'dispatch_id', label: 'Dispatch ID' },
    { key: 'task_id', label: 'Task ID' },
    { key: 'role', label: 'Role' },
    { key: 'command', label: 'Command' },
    { key: 'risk_level', label: 'Risk Level' },
  ];

  return (
    <div className={styles.payloadViewer}>
      <div className={styles.header}>
        <h3 className={styles.title}>Dispatch Payload</h3>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.toggleBtn} ${view === 'structured' ? styles.active : ''}`}
            onClick={() => setView('structured')}
          >
            Structured
          </button>
          <button
            className={`${styles.toggleBtn} ${view === 'json' ? styles.active : ''}`}
            onClick={() => setView('json')}
          >
            JSON
          </button>
        </div>
      </div>

      {view === 'structured' ? (
        <div className={styles.structured}>
          <div className={styles.keyFields}>
            {keyFields.map(({ key, label }) => (
              <div key={key} className={styles.field}>
                <span className={styles.fieldLabel}>{label}</span>
                <span className={styles.fieldValue}>{String(payload[key as keyof DispatchPayload])}</span>
              </div>
            ))}
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Goal</h4>
            <p className={styles.goal}>{payload.goal}</p>
          </div>

          {payload.constraints.length > 0 && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Constraints</h4>
              <ul className={styles.list}>
                {payload.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {payload.expected_outputs.length > 0 && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Expected Outputs</h4>
              <ul className={styles.list}>
                {payload.expected_outputs.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <pre className={styles.json}>{JSON.stringify(payload, null, 2)}</pre>
      )}
    </div>
  );
}

export default PayloadViewer;