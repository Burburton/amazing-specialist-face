import styles from './CommandsPage.module.css';
import commandsData from '../data/commands.json';
import CommandCard from '../components/cards/CommandCard';

const WORKFLOW_STEPS = [
  { step: 1, command: 'spec-start', label: '定义规格' },
  { step: 2, command: 'spec-plan', label: '制定计划' },
  { step: 3, command: 'spec-tasks', label: '分解任务' },
  { step: 4, command: 'spec-implement', label: '执行实现' },
  { step: 5, command: 'spec-audit', label: '审计验收' },
];

export default function CommandsPage() {
  return (
    <div className={styles.commandsPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>核心命令</h1>
        <p className={styles.subtitle}>
          {commandsData.total} 个命令 · 完整开发流程 · 从规格到验收
        </p>
      </header>

      <section className={styles.workflow}>
        <h2 className={styles.sectionTitle}>工作流程</h2>
        <div className={styles.workflowSteps}>
          {WORKFLOW_STEPS.map((item, idx) => (
            <div key={item.step} className={styles.workflowStep}>
              <div className={styles.stepNumber}>{item.step}</div>
              <div className={styles.stepContent}>
                <code className={styles.stepCommand}>/{item.command}</code>
                <span className={styles.stepLabel}>{item.label}</span>
              </div>
              {idx < WORKFLOW_STEPS.length - 1 && (
                <div className={styles.stepArrow}>→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.commandsList}>
        <h2 className={styles.sectionTitle}>命令详情</h2>
        <p className={styles.sectionDesc}>
          每个命令接收 feature 名称或 ID，支持 --enhanced 标志启用 M4 增强技能。
        </p>
        <div className={styles.commandsGrid}>
          {commandsData.commands.map((command, idx) => (
            <CommandCard key={command.name} command={command} index={idx} />
          ))}
        </div>
      </section>
    </div>
  );
}
