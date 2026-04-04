import { Link } from 'react-router-dom';
import styles from './CommandCard.module.css';

interface Command {
  name: string;
  description: string;
  inputs: string[];
  outputs: string[];
}

interface CommandCardProps {
  command: Command;
  index: number;
  href?: string;
}

const COMMAND_COLORS = [
  '#2563eb',
  '#22c55e',
  '#f59e0b',
  '#8b5cf6',
  '#ef4444',
];

export default function CommandCard({ command, index, href }: CommandCardProps) {
  const color = COMMAND_COLORS[index % COMMAND_COLORS.length];

  const content = (
    <>
      <div className={styles.commandHeader}>
        <span className={styles.commandNumber} style={{ backgroundColor: color }}>
          {index + 1}
        </span>
        <h3 className={styles.commandName}>/{command.name}</h3>
      </div>
      
      <p className={styles.commandDescription}>{command.description}</p>
      
      <div className={styles.commandMeta}>
        <div className={styles.metaSection}>
          <span className={styles.metaLabel}>Inputs:</span>
          <ul className={styles.metaList}>
            {command.inputs.map((input, idx) => (
              <li key={idx} className={styles.metaItem}>
                <code className={styles.code}>{input}</code>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.metaSection}>
          <span className={styles.metaLabel}>Outputs:</span>
          <ul className={styles.metaList}>
            {command.outputs.map((output, idx) => (
              <li key={idx} className={styles.metaItem}>
                <code className={styles.code}>{output}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link to={href} className={styles.commandCard} style={{ borderColor: color }}>
        {content}
      </Link>
    );
  }

  return (
    <article className={styles.commandCard} style={{ borderColor: color }}>
      {content}
    </article>
  );
}