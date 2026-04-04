import styles from './HelloWorld.module.css';

interface HelloWorldProps {
  message?: string;
}

function HelloWorld({ message = 'Hello, World!' }: HelloWorldProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.greeting}>{message}</h1>
      <p className={styles.description}>
        This component demonstrates the GitHub Issue driven development workflow.
      </p>
    </div>
  );
}

export default HelloWorld;