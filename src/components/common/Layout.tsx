import { Outlet } from 'react-router-dom';
import Header from './Header';
import styles from './Layout.module.css';

function Layout() {
  return (
    <div className={styles.layout}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className={styles.main} role="main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;