import { Link } from 'react-router-dom';
import styles from './BackButton.module.css';

interface BackButtonProps {
  to: string;
  label?: string;
}

export default function BackButton({ to, label = '返回' }: BackButtonProps) {
  return (
    <Link to={to} className={styles.backButton}>
      <span className={styles.arrow}>←</span>
      <span className={styles.label}>{label}</span>
    </Link>
  );
}