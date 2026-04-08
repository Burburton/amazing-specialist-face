import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.label}>ERROR</p>
      <h2 className={styles.title}>Page Not Found</h2>
      <p className={styles.description}>
        The page you are looking for does not exist or has been moved.
      </p>
      <div className={styles.decorativeLine} />
      <Link to="/" className={styles.homeLink}>
        <span className={styles.arrow}>←</span>
        <span>Back to Home</span>
      </Link>
    </div>
  );
}