import styles from './CommandsPage.module.css';
import commandsData from '../data/commands.json';
import CommandCard from '../components/cards/CommandCard';

const WORKFLOW_STEPS = [
  { step: 1, command: 'spec-start', label: '定义规格', labelEn: 'DEFINE SPEC' },
  { step: 2, command: 'spec-plan', label: '制定计划', labelEn: 'PLAN DESIGN' },
  { step: 3, command: 'spec-tasks', label: '分解任务', labelEn: 'BREAKDOWN TASKS' },
  { step: 4, command: 'spec-implement', label: '执行实现', labelEn: 'IMPLEMENT' },
  { step: 5, command: 'spec-audit', label: '审计验收', labelEn: 'AUDIT REVIEW' },
];

export default function CommandsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <p className={styles.heroLabel}>COMMANDS</p>
        <h1 className={styles.heroTitle}>核心命令</h1>
        <p className={styles.heroSubtitle}>
          {commandsData.commands.length} 个命令 · 完整开发流程 · 从规格到验收
        </p>
        <div className={styles.heroDecorativeLine} />
      </section>

      <section className={styles.workflowSection}>
        <div className={styles.workflowContent}>
          <h2 className={styles.workflowTitle}>工作流程</h2>
          <p className={styles.workflowSubtitle}>WORKFLOW TIMELINE</p>
          <div className={styles.workflowTimeline}>
            {WORKFLOW_STEPS.map((item, idx) => (
              <div key={item.step} className={styles.workflowStep}>
                <span className={styles.stepNumber}>
                  {String(item.step).padStart(2, '0')}
                </span>
                {idx < WORKFLOW_STEPS.length - 1 && (
                  <div className={styles.stepConnector} />
                )}
                <div className={styles.stepContent}>
                  <code className={styles.stepCommand}>/{item.command}</code>
                  <span className={styles.stepLabel}>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>01</span>
          <div>
            <p className={styles.sectionLabel}>COMMAND DETAILS</p>
            <h2 className={styles.sectionTitle}>命令详情</h2>
          </div>
        </div>
        <div className={styles.commandsGrid}>
          {commandsData.commands.map((command, idx) => (
            <CommandCard 
              key={command.name} 
              command={command} 
              index={idx} 
              stepInfo={WORKFLOW_STEPS.find(s => s.command === command.name)}
              href={`/commands/${command.name}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}