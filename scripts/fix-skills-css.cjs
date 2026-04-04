const fs = require('fs');

const cssContent = `.skillsPage {
  min-height: 100vh;
  padding: var(--space-2xl) var(--space-lg);
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-sm);
}

.subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
}

.filters {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.roleButtons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.roleButton {
  padding: var(--space-sm) var(--space-md);
  background: var(--color-bg-primary);
  border: 2px solid var(--color-border-light);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  transition: all var(--transition-normal);
}

.roleButton:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-primary);
}

.roleButton.active {
  color: var(--color-text-inverse);
  border-color: transparent;
}

.filterRow {
  display: flex;
  gap: var(--space-md);
}

.searchInput {
  flex: 1;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
}

.searchInput:focus {
  outline: none;
  border-color: var(--color-primary);
}

.categorySelect {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  cursor: pointer;
}

.categorySelect:focus {
  outline: none;
  border-color: var(--color-primary);
}

.stats {
  display: flex;
  justify-content: center;
  gap: var(--space-xl);
  margin-bottom: var(--space-xl);
  padding: var(--space-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
}

.statItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
}

.statValue {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.statLabel {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.skillGrid {
  margin-bottom: var(--space-xl);
}

.roleGroup {
  margin-bottom: var(--space-xl);
}

.roleGroupTitle {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 2px solid currentColor;
}

.skills {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-md);
}

@media (max-width: 768px) {
  .roleButtons {
    flex-direction: column;
  }

  .roleButton {
    width: 100%;
    justify-content: center;
  }

  .filterRow {
    flex-direction: column;
  }

  .skills {
    grid-template-columns: 1fr;
  }

  .stats {
    flex-direction: column;
    gap: var(--space-md);
  }
}
`;

fs.writeFileSync('src/pages/SkillsPage.module.css', cssContent);
console.log('Fixed SkillsPage.module.css');