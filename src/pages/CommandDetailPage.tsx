import { useParams, Navigate } from 'react-router-dom';
import BackButton from '../components/shared/BackButton';
import commandsData from '../data/commands.json';
import styles from './CommandDetailPage.module.css';

const COMMAND_COLORS = [
  '#2563eb',
  '#22c55e',
  '#f59e0b',
  '#8b5cf6',
  '#ef4444',
];

const WORKFLOW_STEPS = [
  { step: 1, command: 'spec-start', label: '定义规格' },
  { step: 2, command: 'spec-plan', label: '制定计划' },
  { step: 3, command: 'spec-tasks', label: '分解任务' },
  { step: 4, command: 'spec-implement', label: '执行实现' },
  { step: 5, command: 'spec-audit', label: '审计验收' },
];

export default function CommandDetailPage() {
  const { name } = useParams();
  const commandIndex = commandsData.commands.findIndex(c => c.name === name);
  const command = commandsData.commands[commandIndex];

  if (!command) {
    return <Navigate to="/commands" replace />;
  }

  const color = COMMAND_COLORS[commandIndex % COMMAND_COLORS.length];
  const workflowStep = WORKFLOW_STEPS.find(s => s.command === name);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <BackButton to="/commands" label="返回命令" />

        <section className={styles.headerSection}>
          <div className={styles.stepNumber} style={{ backgroundColor: color }}>
            {workflowStep?.step || commandIndex + 1}
          </div>
          <h1 className={styles.title}>/{command.name}</h1>
          {workflowStep && (
            <p className={styles.stepLabel}>Step {workflowStep.step} of 5 · {workflowStep.label}</p>
          )}
        </section>

        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>描述</h2>
          <p className={styles.description}>{command.description}</p>
        </section>

        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Inputs</h2>
          <ul className={styles.list}>
            {command.inputs.map((input, idx) => (
              <li key={idx}>
                <code className={styles.code}>{input}</code>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Outputs</h2>
          <ul className={styles.list}>
            {command.outputs.map((output, idx) => (
              <li key={idx}>
                <code className={styles.code}>{output}</code>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.usageSection}>
          <h2 className={styles.sectionTitle}>Usage</h2>
          <code className={styles.usage}>
            /{command.name} &lt;feature-name-or-id&gt; [--enhanced]
          </code>
        </section>
      </div>
    </div>
  );
}