import { useMemo } from 'react';
import type { DemoOutput } from '../../types/skill-demo';
import styles from './DemoOutputPreview.module.css';

interface DemoOutputPreviewProps {
  output: DemoOutput;
}

export default function DemoOutputPreview({ output }: DemoOutputPreviewProps) {
  const { name, type, label, description, example_value } = output;

  const formattedValue = useMemo(() => {
    if (type === 'json') {
      try {
        const parsed = JSON.parse(example_value);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return example_value;
      }
    }
    return example_value;
  }, [example_value, type]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(example_value);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = example_value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className={styles.output}>
      <div className={styles.header}>
        <label className={styles.label} htmlFor={`demo-output-${name}`}>
          {label}
        </label>
        <button
          type="button"
          onClick={handleCopy}
          className={styles.copyButton}
          aria-label="Copy to clipboard"
        >
          Copy
        </button>
      </div>
      {description && <p className={styles.description}>{description}</p>}
      
      <div className={`${styles.preview} ${styles[type]}`}>
        {type === 'markdown' ? (
          <pre className={styles.markdownContent}>{formattedValue}</pre>
        ) : (
          <pre className={styles.codeContent}>{formattedValue}</pre>
        )}
      </div>
    </div>
  );
}