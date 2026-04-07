import type { SkillDemo } from '../../types/skill-demo';
import { useDemoInputs } from '../../hooks/useSkillDemo';
import DemoInputField from './DemoInputField';
import DemoOutputPreview from './DemoOutputPreview';
import styles from './SkillDemoPanel.module.css';

interface SkillDemoPanelProps {
  demo: SkillDemo;
}

export default function SkillDemoPanel({ demo }: SkillDemoPanelProps) {
  const { inputValues, updateInput, resetInputs } = useDemoInputs(demo);

  return (
    <section className={styles.panel}>
      <h2 className={styles.title}>Try It</h2>
      <p className={styles.subtitle}>Interactive Demo</p>

      <div className={styles.grid}>
        <div className={styles.column}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.icon}>📥</span>
            Input Parameters
          </h3>
          <div className={styles.inputs}>
            {demo.inputs.map((input) => (
              <DemoInputField
                key={input.name}
                input={input}
                value={inputValues[input.name] || input.default_value}
                onChange={(value) => updateInput(input.name, value)}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={resetInputs}
            className={styles.resetButton}
          >
            Reset to Defaults
          </button>
        </div>

        <div className={styles.column}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.icon}>📤</span>
            Expected Output
          </h3>
          <div className={styles.outputs}>
            {demo.outputs.map((output) => (
              <DemoOutputPreview key={output.name} output={output} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.context}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.icon}>⚡</span>
          Context
        </h3>
        <div className={styles.contextGrid}>
          <div className={styles.contextItem}>
            <span className={styles.contextLabel}>Trigger</span>
            <span className={styles.contextValue}>{demo.context.trigger}</span>
          </div>
          <div className={styles.contextItem}>
            <span className={styles.contextLabel}>Typical Duration</span>
            <span className={styles.contextValue}>{demo.context.typical_duration}</span>
          </div>
          {demo.context.dependencies.length > 0 && (
            <div className={styles.contextItem}>
              <span className={styles.contextLabel}>Dependencies</span>
              <span className={styles.contextValue}>
                {demo.context.dependencies.map((dep) => dep.split('/').pop()).join(', ')}
              </span>
            </div>
          )}
        </div>
        {demo.context.role_responsibilities.length > 0 && (
          <div className={styles.responsibilities}>
            <span className={styles.contextLabel}>Role Responsibilities</span>
            <ul className={styles.responsibilityList}>
              {demo.context.role_responsibilities.map((resp, idx) => (
                <li key={idx} className={styles.responsibilityItem}>{resp}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}