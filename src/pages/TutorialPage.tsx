import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TutorialIntroSlide from '../components/tutorial/TutorialIntroSlide';
import TutorialWhySlide from '../components/tutorial/TutorialWhySlide';
import TutorialExampleSlide from '../components/tutorial/TutorialExampleSlide';
import TutorialStepsSlide from '../components/tutorial/TutorialStepsSlide';
import TutorialTrySlide from '../components/tutorial/TutorialTrySlide';
import TutorialNextSlide from '../components/tutorial/TutorialNextSlide';
import styles from './TutorialPage.module.css';

export default function TutorialPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash.startsWith('#slide-')) {
      const index = parseInt(location.hash.replace('#slide-', ''), 10);
      if (!isNaN(index)) {
        setTimeout(() => {
          const container = document.querySelector('[data-slide-container]');
          if (container) {
            const slide = container.children[index] as HTMLElement;
            slide?.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div className={styles.slideContainer} data-slide-container>
      <TutorialIntroSlide />
      <TutorialWhySlide />
      <TutorialExampleSlide />
      <TutorialStepsSlide />
      <TutorialTrySlide />
      <TutorialNextSlide />
    </div>
  );
}