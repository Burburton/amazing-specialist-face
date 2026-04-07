import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import styles from './TutorialStepsSlide.module.css';

const STEPS = [
  { 
    step: 1, 
    title: '选择一个技能', 
    description: '根据你当前的任务，选择对应的技能',
    action: '浏览技能库',
    link: '/skills'
  },
  { 
    step: 2, 
    title: '查看技能说明', 
    description: '每个技能都有详细的说明和示例',
    action: '查看示例',
    link: '/skills/architect%2Frequirement-to-design'
  },
  { 
    step: 3, 
    title: '填写输入参数', 
    description: '在 Demo 区域填写你的需求',
    action: null,
    link: null
  },
  { 
    step: 4, 
    title: '查看输出结果', 
    description: '专家包会生成专业的输出',
    action: null,
    link: null
  },
  { 
    step: 5, 
    title: '应用到项目', 
    description: '将输出复制到你的项目中',
    action: null,
    link: null
  },
];

export default function TutorialStepsSlide() {
  return (
    <section className={styles.slide} aria-label="如何开始使用">
      <div className={styles.content}>
        <h2 className={styles.title}>如何开始使用？</h2>
        
        <div className={styles.stepsContainer}>
          {STEPS.map((item) => (
            <div key={item.step} className={styles.stepCard}>
              <span className={styles.stepNumber}>{item.step}</span>
              <h3 className={styles.stepTitle}>{item.title}</h3>
              <p className={styles.stepDescription}>{item.description}</p>
              {item.link && (
                <Link to={item.link!} className={styles.stepLink}>
                  {item.action} <Icon name="arrow-right" size={16} />
                </Link>
              )}
            </div>
          ))}
        </div>
        
        <div className={styles.tip}>
          <span className={styles.tipEmoji}>💡</span>
          <span className={styles.tipText}>每个步骤都可以跳过，你可以从任意位置开始</span>
        </div>
      </div>
    </section>
  );
}