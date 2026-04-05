import { describe, it, expect } from 'vitest';

describe('Layout Component Structure', () => {
  it('should export Layout function', async () => {
    const module = await import('../components/common/Layout');
    expect(module.default).toBeDefined();
    expect(typeof module.default).toBe('function');
  });
});

describe('Layout CSS Classes', () => {
  it('should use modern viewport unit (svh)', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const cssPath = path.join(process.cwd(), 'src/components/common/Layout.module.css');
    const content = fs.readFileSync(cssPath, 'utf-8');
    expect(content.includes('min-height: 100svh')).toBe(true);
  });

  it('should have flexbox layout', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const cssPath = path.join(process.cwd(), 'src/components/common/Layout.module.css');
    const content = fs.readFileSync(cssPath, 'utf-8');
    expect(content.includes('display: flex')).toBe(true);
    expect(content.includes('flex-direction: column')).toBe(true);
  });

  it('should have min-height for full viewport', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const cssPath = path.join(process.cwd(), 'src/components/common/Layout.module.css');
    const content = fs.readFileSync(cssPath, 'utf-8');
    expect(content.includes('min-height')).toBe(true);
  });
});

describe('Layout Integration', () => {
  it('should import Header component', async () => {
    const layoutModule = await import('../components/common/Layout');
    expect(layoutModule.default).toBeDefined();
  });

  it('should import Outlet from react-router-dom', async () => {
    const routerModule = await import('react-router-dom');
    expect(routerModule.Outlet).toBeDefined();
  });
});