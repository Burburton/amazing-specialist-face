import { Link } from 'react-router-dom';
import styles from './CommandCard.module.css';

interface Command {
  name: string;
  description: string;
  inputs: string[];
  outputs: string[];
}

interface StepInfo {
  step: number;
  labelEn?: string;
}

interface CommandCardProps {
  command: Command;
  index: number;
  stepInfo?: StepInfo;
  href?: string;
}

export default function CommandCard({ 
  command, 
  index, 
  stepInfo,
  href 
}: CommandCardProps) {
  const number = String(stepInfo?.step || index + 1).padStart(2, '0');

  const content = (
    <>
      <div className={styles.numberSection}>
        <span className={styles.numberBadge}>{number}</span>
        {stepInfo?.labelEn && (
          <span className={styles.stepLabel}>{stepInfo.labelEn}</span>
        )}
      </div>
      
      <div className={styles.contentSection}>
        <h3 className={styles.commandName}>/{command.name}</h3>
        <div className={styles.decorativeLine} />
        <p className={styles.commandDescription}>{command.description}</p>
        
        <div className={styles.ioSection}>
          <div className={styles.ioBlock}>
            <p className={styles.ioLabel}>INPUTS</p>
            <ul className={styles.ioList}>
              {command.inputs.map((input, idx) => (
                <li key={idx} className={styles.ioItem}>{input}</li>
              ))}
            </ul>
          </div>
          
          <div className={styles.ioBlock}>
            <p className={styles.ioLabel}>OUTPUTS</p>
            <ul className={styles.ioList}>
              {command.outputs.map((output, idx) => (
                <li key={idx} className={styles.ioItem}>{output}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link to={href} className={styles.card}>
        {content}
      </Link>
    );
  }

  return (
    <article className={styles.card}>
      {content}
    </article>
  );
}