import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CoverSlide from '../components/slides/CoverSlide';
import WhatIsSlide from '../components/slides/WhatIsSlide';
import HowItWorksSlide from '../components/slides/HowItWorksSlide';
import CapabilitiesSlide from '../components/slides/CapabilitiesSlide';
import GetStartedSlide from '../components/slides/GetStartedSlide';
import styles from './HomePage.module.css';

export default function HomePage() {
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
      <CoverSlide />
      <WhatIsSlide />
      <HowItWorksSlide />
      <CapabilitiesSlide />
      <GetStartedSlide />
    </div>
  );
}