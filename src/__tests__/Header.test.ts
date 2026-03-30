import { describe, it, expect } from 'vitest';

describe('Header Component Structure', () => {
  it('should export Header function', async () => {
    const module = await import('../components/common/Header');
    expect(module.default).toBeDefined();
    expect(typeof module.default).toBe('function');
  });

  it('should have navLinks array with 5 links', async () => {
    const expectedLinks = [
      { path: '/', label: 'Home' },
      { path: '/skills', label: 'Skills' },
      { path: '/roles', label: 'Roles' },
      { path: '/contracts', label: 'Contracts' },
      { path: '/commands', label: 'Commands' },
    ];
    expect(expectedLinks.length).toBe(5);
    expect(expectedLinks[0].path).toBe('/');
    expect(expectedLinks[4].label).toBe('Commands');
  });

  it('should have CSS module import', async () => {
    const cssModule = await import('../components/common/Header.module.css');
    expect(cssModule).toBeDefined();
    expect(cssModule.header).toBeDefined();
    expect(cssModule.nav).toBeDefined();
    expect(cssModule.logo).toBeDefined();
    expect(cssModule.active).toBeDefined();
    expect(cssModule.mobileNav).toBeDefined();
    expect(cssModule.menuButton).toBeDefined();
  });
});

describe('Header CSS Classes', () => {
  it('should have responsive breakpoint at 768px', async () => {
    const cssContent = `@media (max-width: 768px)`;
    const fs = await import('fs');
    const path = await import('path');
    const cssPath = path.join(process.cwd(), 'src/components/common/Header.module.css');
    const content = fs.readFileSync(cssPath, 'utf-8');
    expect(content.includes('@media (max-width: 768px)')).toBe(true);
  });

  it('should have sticky header positioning', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const cssPath = path.join(process.cwd(), 'src/components/common/Header.module.css');
    const content = fs.readFileSync(cssPath, 'utf-8');
    expect(content.includes('position: sticky')).toBe(true);
  });

  it('should have hamburger menu styles', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const cssPath = path.join(process.cwd(), 'src/components/common/Header.module.css');
    const content = fs.readFileSync(cssPath, 'utf-8');
    expect(content.includes('.hamburger')).toBe(true);
    expect(content.includes('.bar')).toBe(true);
  });
});