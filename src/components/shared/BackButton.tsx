import { Link } from 'react-router-dom';
import styles from './BackButton.module.css';
import Icon from '../common/Icon';

interface BackButtonProps {
  to: string;
  label?: string;
}

export default function BackButton({ to, label = '返回' }: BackButtonProps) {
  return (
    <Link to={to} className={styles.backButton}>
      <span className={styles.arrow}><Icon name="arrow-left" size={16} /></span>
      <span className={styles.label}>{label}</span>
    </Link>
  );
}