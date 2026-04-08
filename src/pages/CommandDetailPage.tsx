import { useParams, Navigate } from 'react-router-dom';
import BackButton from '../components/shared/BackButton';
import commandsData from '../data/commands.json';
import styles from './CommandDetailPage.module.css';

const WORKFLOW_STEPS = [
  { step: 1, command: 'spec-start', label: '定义规格', labelEn: 'DEFINE SPEC' },
  { step: 2, command: 'spec-plan', label: '制定计划', labelEn: 'PLAN DESIGN' },
  { step: 3, command: 'spec-tasks', label: '分解任务', labelEn: 'BREAKDOWN TASKS' },
  { step: 4, command: 'spec-implement', label: '执行实现', labelEn: 'IMPLEMENT' },
  { step: 5, command: 'spec-audit', label: '审计验收', labelEn: 'AUDIT REVIEW' },
];

export default function CommandDetailPage() {
  const { name } = useParams();
  const command = commandsData.commands.find(c => c.name === name);

  if (!command) {
    return <Navigate to="/commands" replace />;
  }

  const workflowStep = WORKFLOW_STEPS.find(s => s.command === name);
  const number = String(workflowStep?.step || 1).padStart(2, '0');

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <BackButton to="/commands" label="返回命令" />

        <section className={styles.headerSection}>
          <div className={styles.headerTop}>
            <span className={styles.numberBadge}>{number}</span>
            <div className={styles.headerContent}>
              {workflowStep && (
                <p className={styles.stepLabel}>
                  STEP {workflowStep.step} OF 5 · {workflowStep.labelEn}
                </p>
              )}
              <h1 className={styles.title}>/{command.name}</h1>
            </div>
          </div>
          <div className={styles.decorativeLine} />
        </section>

        <section className={styles.contentSection}>
          <p className={styles.sectionLabel}>DESCRIPTION</p>
          <h2 className={styles.sectionTitle}>描述</h2>
          <p className={styles.description}>{command.description}</p>
        </section>

        <section className={styles.contentSection}>
          <p className={styles.sectionLabel}>INPUTS</p>
          <h2 className={styles.sectionTitle}>输入</h2>
          <ul className={styles.list}>
            {command.inputs.map((input, idx) => (
              <li key={idx} className={styles.listItem}>
                <code className={styles.code}>{input}</code>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.contentSection}>
          <p className={styles.sectionLabel}>OUTPUTS</p>
          <h2 className={styles.sectionTitle}>输出</h2>
          <ul className={styles.list}>
            {command.outputs.map((output, idx) => (
              <li key={idx} className={styles.listItem}>
                <code className={styles.code}>{output}</code>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.usageSection}>
          <p className={styles.sectionLabel}>USAGE</p>
          <h2 className={styles.sectionTitle}>使用方式</h2>
          <code className={styles.usage}>
            /{command.name} &lt;feature-name-or-id&gt; [--enhanced]
          </code>
        </section>
      </div>
    </div>
  );
}