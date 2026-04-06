import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../components/common/ThemeToggle';

const mockSetTheme = vi.fn();

vi.mock('../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'dark',
    setTheme: mockSetTheme,
    resolvedTheme: 'dark',
  }),
}));

describe('ThemeToggle', () => {
  describe('initial state', () => {
    it('should render a toggle button', () => {
      render(<ThemeToggle />);
      expect(screen.getByRole('button', { name: /current theme/i })).toBeInTheDocument();
    });

    it('should show a theme icon', () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      expect(button.textContent).toMatch(/[🌙☀️]/);
    });

    it('should have aria-expanded set to false initially', () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button', { name: /current theme/i });
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have aria-haspopup attribute', () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button', { name: /current theme/i });
      expect(button).toHaveAttribute('aria-haspopup', 'menu');
    });
  });

  describe('menu interaction', () => {
    it('should open menu on click', () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(screen.getByRole('menu', { name: /theme options/i })).toBeInTheDocument();
    });

    it('should set aria-expanded to true when open', () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should close menu when clicking outside', () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(screen.getByRole('menu')).toBeInTheDocument();
      
      fireEvent.mouseDown(document.body);
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('should close menu when pressing Escape', async () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(screen.getByRole('menu')).toBeInTheDocument();
      
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('theme options', () => {
    it('should show all three theme options', () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(screen.getByRole('menuitemradio', { name: /light/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitemradio', { name: /dark/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitemradio', { name: /system/i })).toBeInTheDocument();
    });

    it('should have aria-checked attributes on theme options', () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      const menuItems = screen.getAllByRole('menuitemradio');
      const checkedItems = menuItems.filter(item => item.getAttribute('aria-checked') === 'true');
      expect(checkedItems.length).toBe(1);
    });
  });

  describe('accessibility', () => {
    it('should have descriptive aria-label', () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('Current theme'));
    });

    it('should have proper role attributes on menu items', () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      const menuItems = screen.getAllByRole('menuitemradio');
      expect(menuItems).toHaveLength(3);
    });
  });
});