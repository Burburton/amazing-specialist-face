import CoverSlide from '../components/slides/CoverSlide';
import WhatIsSlide from '../components/slides/WhatIsSlide';
import HowItWorksSlide from '../components/slides/HowItWorksSlide';
import CapabilitiesSlide from '../components/slides/CapabilitiesSlide';
import GetStartedSlide from '../components/slides/GetStartedSlide';
import styles from './HomePage.module.css';

export default function HomePage() {
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