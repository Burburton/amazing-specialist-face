import { Link } from 'react-router-dom';
import styles from './TutorialStepsSlide.module.css';

const STEPS = [
  { number: '01', title: '选择一个技能', description: '根据你当前的任务，选择对应的技能', link: '/skills' },
  { number: '02', title: '查看技能说明', description: '每个技能都有详细的说明和示例', link: '/skills/architect%2Frequirement-to-design' },
  { number: '03', title: '填写输入参数', description: '在 Demo 区域填写你的需求' },
  { number: '04', title: '查看输出结果', description: '专家包会生成专业的输出' },
  { number: '05', title: '应用到项目', description: '将输出复制到你的项目中' },
];

export default function TutorialStepsSlide() {
  return (
    <section className={styles.slide} aria-label="如何开始使用">
      <div className={styles.header}>
        <h2 className={styles.title}>如何开始使用？</h2>
        <div className={styles.decorativeLine} aria-hidden="true" />
        <p className={styles.subtitle}>How to get started?</p>
      </div>
      
      <div className={styles.stepsContainer}>
        {STEPS.map((item) => (
          <div key={item.number} className={styles.stepCard}>
            <span className={styles.stepNumber}>{item.number}</span>
            <h3 className={styles.stepTitle}>{item.title}</h3>
            <p className={styles.stepDescription}>{item.description}</p>
            {item.link && (
              <Link to={item.link} className={styles.stepLink}>
                查看详情 →
              </Link>
            )}
          </div>
        ))}
      </div>
      
      <p className={styles.tip}>
        💡 每个步骤都可以跳过，你可以从任意位置开始
      </p>
    </section>
  );
}