import { useState } from 'react';
import TutorialIntroSlide from '../components/tutorial/TutorialIntroSlide';
import TutorialWhySlide from '../components/tutorial/TutorialWhySlide';
import TutorialExampleSlide from '../components/tutorial/TutorialExampleSlide';
import TutorialStepsSlide from '../components/tutorial/TutorialStepsSlide';
import TutorialTrySlide from '../components/tutorial/TutorialTrySlide';
import TutorialNextSlide from '../components/tutorial/TutorialNextSlide';
import styles from './TutorialPage.module.css';

const STEPS = [
  { id: 'intro', label: 'INTRO', title: '什么是专家包' },
  { id: 'why', label: 'WHY', title: '它能帮你做什么' },
  { id: 'example', label: 'EXAMPLE', title: '实战案例' },
  { id: 'steps', label: 'STEPS', title: '如何开始使用' },
  { id: 'try', label: 'TRY', title: '动手试试' },
  { id: 'next', label: 'NEXT', title: '下一步学什么' },
];

export default function TutorialPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const goToStep = (index: number) => {
    if (index >= 0 && index < STEPS.length) {
      setCurrentStep(index);
    }
  };

  const goNext = () => goToStep(currentStep + 1);
  const goPrev = () => goToStep(currentStep - 1);

  const renderSlide = () => {
    switch (currentStep) {
      case 0: return <TutorialIntroSlide />;
      case 1: return <TutorialWhySlide />;
      case 2: return <TutorialExampleSlide />;
      case 3: return <TutorialStepsSlide />;
      case 4: return <TutorialTrySlide />;
      case 5: return <TutorialNextSlide />;
      default: return null;
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>教程</h2>
          <p className={styles.sidebarSubtitle}>TUTORIAL</p>
          
          <nav className={styles.stepNav}>
            {STEPS.map((step, index) => (
              <button
                key={step.id}
                className={`${styles.stepNavItem} ${currentStep === index ? styles.stepNavItemActive : ''}`}
                onClick={() => goToStep(index)}
                type="button"
              >
                <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                <div className={styles.stepInfo}>
                  <span className={styles.stepLabel}>{step.label}</span>
                  <span className={styles.stepTitle}>{step.title}</span>
                </div>
              </button>
            ))}
          </nav>
        </aside>

        <main className={styles.mainContent}>
          <div className={styles.slideWrapper}>
            {renderSlide()}
          </div>

          <footer className={styles.footer}>
            <div className={styles.progressIndicator}>
              <span className={styles.progressText}>
                {String(currentStep + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
              </span>
              <div className={styles.progressBar}>
                {STEPS.map((_, index) => (
                  <span
                    key={index}
                    className={`${styles.progressDot} ${currentStep === index ? styles.progressDotActive : ''}`}
                  />
                ))}
              </div>
            </div>

            <div className={styles.navButtons}>
              <button
                className={`${styles.navButton} ${styles.navButtonSecondary}`}
                onClick={goPrev}
                disabled={currentStep === 0}
                type="button"
              >
                ← 上一步
              </button>
              <button
                className={styles.navButton}
                onClick={goNext}
                disabled={currentStep === STEPS.length - 1}
                type="button"
              >
                {currentStep === STEPS.length - 1 ? '完成' : '下一步 →'}
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}