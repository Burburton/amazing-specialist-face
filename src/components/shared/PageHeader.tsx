import styles from './PageHeader.module.css';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  label?: string;
  icon?: string;
}

export default function PageHeader({ title, subtitle, label, icon }: PageHeaderProps) {
  return (
    <header className={styles.pageHeader}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {label && <p className={styles.label}>{label}</p>}
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles.decorativeLine} />
    </header>
  );
}