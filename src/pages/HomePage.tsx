import CoverSlide from '../components/slides/CoverSlide';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.slideContainer}>
      <CoverSlide />
      
      {/* 临时占位，后续添加更多 Slide */}
      <section className={styles.placeholderSlide}>
        <p className={styles.placeholderText}>
          后续 Slide 将在这里添加...
        </p>
        <p className={styles.placeholderHint}>
          现在请先验证封面 Slide 的 PPT 说明书风格
        </p>
      </section>
    </div>
  );
}