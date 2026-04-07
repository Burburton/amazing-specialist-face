import styles from './CategoryFilter.module.css';

interface Category {
  id: string;
  label: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selected: string;
  onSelect: (id: string) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className={styles.filter}>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`${styles.filterBtn} ${selected === category.id ? styles.active : ''}`}
          onClick={() => onSelect(category.id)}
          type="button"
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}