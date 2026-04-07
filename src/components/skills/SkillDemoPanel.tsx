import { useState } from 'react';
import type { SkillDemo } from '../../types/skill-demo';
import { useDemoInputs } from '../../hooks/useSkillDemo';
import Icon from '../common/Icon';
import styles from './SkillDemoPanel.module.css';

interface SkillDemoPanelProps {
  demo: SkillDemo;
}

const SKILL_SUMMARIES: Record<string, string> = {
  'architect/requirement-to-design': '把你的需求描述转换成技术设计方案',
  'developer/bugfix-workflow': '分析 bug 原因并给出修复方案',
  'tester/unit-test-design': '为你的函数生成测试用例',
  'reviewer/code-review-checklist': '检查代码质量和潜在问题',
  'common/artifact-reading': '从项目文档中提取关键信息',
};

const ROLE_NAMES: Record<string, string> = {
  architect: '架构师',
  developer: '开发者',
  tester: '测试员',
  reviewer: '审查员',
  docs: '文档员',
  security: '安全员',
  common: '通用',
};

export default function SkillDemoPanel({ demo }: SkillDemoPanelProps) {
  const { inputValues, updateInput, resetInputs } = useDemoInputs(demo);
  const [activeStep, setActiveStep] = useState(0);
  const [showOutput, setShowOutput] = useState(true);

  const skillSummary = SKILL_SUMMARIES[demo.skill_id] || demo.outputs[0]?.description || '执行此技能';
  const role = demo.skill_id.split('/')[0];
  const roleName = ROLE_NAMES[role] || role;

  const handleInputChange = (name: string, value: string) => {
    updateInput(name, value);
    setActiveStep(1);
  };

  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <Icon name={(role as 'architect') || 'common'} size={32} />
        </div>
        <div className={styles.headerContent}>
          <h2 className={styles.headerTitle}>这个技能能做什么？</h2>
          <p className={styles.headerSummary}>{skillSummary}</p>
          <div className={styles.headerMeta}>
            <span className={styles.metaItem}>
              <Icon name="architect" size={16} /> 由 {roleName} 执行
            </span>
            <span className={styles.metaItem}>
              ⏱️ 通常需要 {demo.context.typical_duration}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.stepper}>
        <div className={`${styles.step} ${activeStep >= 0 ? styles.active : ''}`}>
          <span className={styles.stepNumber}>①</span>
          <span className={styles.stepLabel}>填写信息</span>
        </div>
        <div className={styles.stepLine} />
        <div className={`${styles.step} ${activeStep >= 1 ? styles.active : ''}`}>
          <span className={styles.stepNumber}>②</span>
          <span className={styles.stepLabel}>查看结果</span>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.inputSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEmoji}>✨</span>
            <h3 className={styles.sectionTitle}>来试试看</h3>
          </div>

          <div className={styles.inputs}>
            {demo.inputs.map((input, index) => (
              <div key={input.name} className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                  {input.label}
                  {index === demo.inputs.length - 1 && (
                    <span className={styles.optional}>（可选）</span>
                  )}
                </label>
                {input.description && (
                  <p className={styles.inputHint}>{input.description}</p>
                )}
                {input.type === 'text' && (
                  <input
                    type="text"
                    value={inputValues[input.name] || input.default_value}
                    onChange={(e) => handleInputChange(input.name, e.target.value)}
                    placeholder={input.placeholder}
                    className={styles.textInput}
                  />
                )}
                {input.type === 'textarea' && (
                  <textarea
                    value={inputValues[input.name] || input.default_value}
                    onChange={(e) => handleInputChange(input.name, e.target.value)}
                    placeholder={input.placeholder}
                    className={styles.textarea}
                    rows={4}
                  />
                )}
                {input.type === 'select' && input.options && (
                  <select
                    value={inputValues[input.name] || input.default_value}
                    onChange={(e) => handleInputChange(input.name, e.target.value)}
                    className={styles.select}
                  >
                    {input.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}
                {input.type === 'json' && (
                  <textarea
                    value={inputValues[input.name] || input.default_value}
                    onChange={(e) => handleInputChange(input.name, e.target.value)}
                    placeholder={input.placeholder || '{\n  \n}'}
                    className={styles.textarea}
                    rows={6}
                    spellCheck={false}
                  />
                )}
              </div>
            ))}
          </div>

          <div className={styles.inputActions}>
            <button
              type="button"
              onClick={resetInputs}
              className={styles.resetBtn}
            >
              ↺ 恢复默认
            </button>
          </div>
        </div>

        <div className={styles.outputSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEmoji}>📋</span>
            <h3 className={styles.sectionTitle}>你的结果</h3>
            <button
              type="button"
              onClick={() => setShowOutput(!showOutput)}
              className={styles.toggleBtn}
            >
              {showOutput ? '收起' : '展开'}
            </button>
          </div>

          {showOutput && (
            <div className={styles.outputs}>
              {demo.outputs.map((output) => (
                <div key={output.name} className={styles.outputBlock}>
                  <div className={styles.outputHeader}>
                    <span className={styles.outputLabel}>{output.label}</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(output.example_value);
                      }}
                      className={styles.copyBtn}
                    >
                      📋 复制
                    </button>
                  </div>
                  {output.description && (
                    <p className={styles.outputDesc}>{output.description}</p>
                  )}
                  <pre className={`${styles.outputContent} ${styles[output.type]}`}>
                    {output.type === 'json'
                      ? JSON.stringify(JSON.parse(output.example_value), null, 2)
                      : output.example_value}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.tips}>
        <div className={styles.tipsHeader}>
          <span className={styles.tipsEmoji}>💡</span>
          <span className={styles.tipsTitle}>小贴士</span>
        </div>
        <ul className={styles.tipsList}>
          <li className={styles.tipItem}>
            这个方案由 <strong>{roleName}</strong> 角色生成
          </li>
          <li className={styles.tipItem}>
            手动完成通常需要 <strong>{demo.context.typical_duration}</strong>
          </li>
          {demo.context.dependencies.length > 0 && (
            <li className={styles.tipItem}>
              配合使用: {demo.context.dependencies.map(d => d.split('/').pop()).join(', ')}
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}