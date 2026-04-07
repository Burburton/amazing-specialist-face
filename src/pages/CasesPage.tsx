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

        <section className={styles.headerSection}>
          <h1 className={styles.title}>真实案例</h1>
          <p className={styles.description}>
            看看专家包如何在真实项目中发挥作用
          </p>
        </section>

        <CategoryFilter
          categories={casesData.categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <div className={styles.casesGrid}>
          {filteredCases.map((caseItem) => (
            <CaseCard key={caseItem.id} case={caseItem} />
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