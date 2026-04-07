import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import styles from './TutorialTrySlide.module.css';

const FEATURE_CATEGORIES = [
  { id: 'auth', label: '用户登录', skills: ['architect/requirement-to-design', 'security/auth-and-permission-review'] },
  { id: 'data', label: '数据存储', skills: ['architect/module-boundary-design'] },
  { id: 'api', label: 'API开发', skills: ['architect/interface-contract-design'] },
  { id: 'form', label: '表单验证', skills: ['security/input-validation-review', 'tester/unit-test-design'] },
  { id: 'test', label: '单元测试', skills: ['tester/unit-test-design'] },
  { id: 'review', label: '代码审查', skills: ['reviewer/code-review-checklist'] },
];

const SKILL_NAMES: Record<string, string> = {
  'architect/requirement-to-design': '需求设计',
  'architect/module-boundary-design': '模块边界设计',
  'architect/interface-contract-design': '接口契约设计',
  'security/auth-and-permission-review': '认证安全审查',
  'security/input-validation-review': '输入验证审查',
  'tester/unit-test-design': '单元测试设计',
  'reviewer/code-review-checklist': '代码审查清单',
};

export default function TutorialTrySlide() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const selectedCategory = FEATURE_CATEGORIES.find(f => f.id === selectedFeature);

  return (
    <section className={styles.slide} aria-label="动手试试">
      <div className={styles.content}>
        <h2 className={styles.title}>现在就试试！</h2>
        
        <div className={styles.selectorContainer}>
          <p className={styles.selectorLabel}>想开发什么功能？</p>
          
          <div className={styles.featureGrid}>
            {FEATURE_CATEGORIES.map((feature) => (
              <button
                key={feature.id}
                className={`${styles.featureBtn} ${selectedFeature === feature.id ? styles.selected : ''}`}
                onClick={() => setSelectedFeature(feature.id)}
              >
                {feature.label}
              </button>
            ))}
          </div>
          
          {selectedCategory && (
            <div className={styles.recommendedSkills}>
              <p className={styles.recommendedLabel}>
                "{selectedCategory.label}" 推荐技能：
              </p>
              <div className={styles.skillsList}>
                {selectedCategory.skills.map((skillId) => (
                  <Link
                    key={skillId}
                    to={`/skills/${encodeURIComponent(skillId)}`}
                    className={styles.skillLink}
                  >
                    <Icon name="skills" size={16} />
                    <span>{SKILL_NAMES[skillId] || skillId}</span>
                  </Link>
                ))}
              </div>
              <Link 
                to={`/skills/${encodeURIComponent(selectedCategory.skills[0])}`}
                className={styles.startBtn}
              >
                开始体验 <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}