import type { DemoInput } from '../../types/skill-demo';
import styles from './DemoInputField.module.css';

interface DemoInputFieldProps {
  input: DemoInput;
  value: string;
  onChange: (value: string) => void;
}

export default function DemoInputField({ input, value, onChange }: DemoInputFieldProps) {
  const { name, type, label, description, placeholder, options } = input;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={`demo-input-${name}`}>
        {label}
      </label>
      {description && <p className={styles.description}>{description}</p>}
      
      {type === 'text' && (
        <input
          id={`demo-input-${name}`}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={styles.textInput}
        />
      )}
      
      {type === 'textarea' && (
        <textarea
          id={`demo-input-${name}`}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={styles.textarea}
          rows={4}
        />
      )}
      
      {type === 'select' && options && (
        <select
          id={`demo-input-${name}`}
          value={value}
          onChange={handleChange}
          className={styles.select}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      
      {type === 'json' && (
        <textarea
          id={`demo-input-${name}`}
          value={value}
          onChange={handleChange}
          placeholder={placeholder || '{\n  \n}'}
          className={styles.textarea}
          rows={6}
          spellCheck={false}
        />
      )}
    </div>
  );
}