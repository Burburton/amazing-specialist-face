import { useState, useMemo } from 'react';
import BackButton from '../components/shared/BackButton';
import CategoryFilter from '../components/cases/CategoryFilter';
import CaseCard from '../components/cases/CaseCard';
import casesData from '../data/cases.json';
import styles from './CasesPage.module.css';

export default function CasesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCases = useMemo(() => {
    if (selectedCategory === 'all') {
      return casesData.cases;
    }
    return casesData.cases.filter(c => c.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <BackButton to="/" label="返回首页" />

        <section className={styles.heroSection}>
          <div className={styles.heroLine} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroLabel}>CASE</span>
              <span className={styles.heroLabel}>STUDIES</span>
            </h1>
            <p className={styles.heroDescription}>真实项目案例</p>
          </div>
          <div className={styles.heroCount}>
            <span className={styles.countNumber}>{filteredCases.length}</span>
            <span className={styles.countLabel}>CASES</span>
          </div>
        </section>

        <CategoryFilter
          categories={casesData.categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <div className={styles.casesGrid}>
          {filteredCases.map((caseItem, index) => (
            <CaseCard key={caseItem.id} case={caseItem} index={index} />
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className={styles.emptyState}>
            <p>暂无此类案例</p>
          </div>
        )}
      </div>
    </div>
  );
}