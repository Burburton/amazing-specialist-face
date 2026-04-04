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
}

const COMMAND_COLORS = [
  '#2563eb', // blue
  '#22c55e', // green
  '#f59e0b', // amber
  '#8b5cf6', // purple
  '#ef4444', // red
];

export default function CommandCard({ command, index }: CommandCardProps) {
  const color = COMMAND_COLORS[index % COMMAND_COLORS.length];

  return (
    <div className={styles.commandCard} style={{ borderColor: color }}>
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
    </div>
  );
}
