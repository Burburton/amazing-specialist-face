import styles from './PageHeader.module.css';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon?: string;
}

export default function PageHeader({ title, subtitle, icon }: PageHeaderProps) {
  return (
    <header className={styles.pageHeader}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </header>
  );
}