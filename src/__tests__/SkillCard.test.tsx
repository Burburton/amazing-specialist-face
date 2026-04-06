import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SkillCard from '../components/cards/SkillCard';

const mockSkill = {
  id: 'architect/requirement-to-design',
  name: 'requirement-to-design',
  role: 'architect',
  category: 'MVP',
  description: 'Transform feature specifications into structured technical design notes.',
  path: '/skills/architect/requirement-to-design',
};

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe('SkillCard', () => {
  describe('basic rendering', () => {
    it('should render skill name', () => {
      renderWithRouter(<SkillCard skill={mockSkill} />);
      expect(screen.getByText(mockSkill.name)).toBeInTheDocument();
    });

    it('should render skill description', () => {
      renderWithRouter(<SkillCard skill={mockSkill} />);
      expect(screen.getByText(mockSkill.description)).toBeInTheDocument();
    });

    it('should render skill role', () => {
      renderWithRouter(<SkillCard skill={mockSkill} />);
      expect(screen.getByText(mockSkill.role)).toBeInTheDocument();
    });

    it('should render skill category', () => {
      renderWithRouter(<SkillCard skill={mockSkill} />);
      expect(screen.getByText(mockSkill.category)).toBeInTheDocument();
    });

    it('should render skill id', () => {
      renderWithRouter(<SkillCard skill={mockSkill} />);
      expect(screen.getByText(mockSkill.id)).toBeInTheDocument();
    });
  });

  describe('MVP vs M4 styling', () => {
    it('should have MVP class for MVP skills', () => {
      renderWithRouter(<SkillCard skill={mockSkill} />);
      const categoryBadge = screen.getByText('MVP');
      expect(categoryBadge.className).toMatch(/mvp/i);
    });

    it('should have M4 class for M4 skills', () => {
      const m4Skill = { ...mockSkill, category: 'M4' };
      renderWithRouter(<SkillCard skill={m4Skill} />);
      const categoryBadge = screen.getByText('M4');
      expect(categoryBadge.className).toMatch(/m4/i);
    });
  });

  describe('onClick behavior', () => {
    it('should call onClick when clicked (no href)', () => {
      const handleClick = vi.fn();
      renderWithRouter(<SkillCard skill={mockSkill} onClick={handleClick} />);
      
      const card = screen.getByRole('article');
      fireEvent.click(card);
      
      expect(handleClick).toHaveBeenCalledWith(mockSkill);
    });

    it('should call onClick when pressing Enter', () => {
      const handleClick = vi.fn();
      renderWithRouter(<SkillCard skill={mockSkill} onClick={handleClick} />);
      
      const card = screen.getByRole('article');
      fireEvent.keyDown(card, { key: 'Enter' });
      
      expect(handleClick).toHaveBeenCalledWith(mockSkill);
    });

    it('should call onClick when pressing Space', () => {
      const handleClick = vi.fn();
      renderWithRouter(<SkillCard skill={mockSkill} onClick={handleClick} />);
      
      const card = screen.getByRole('article');
      fireEvent.keyDown(card, { key: ' ' });
      
      expect(handleClick).toHaveBeenCalledWith(mockSkill);
    });
  });

  describe('link behavior', () => {
    it('should render as Link when href is provided', () => {
      renderWithRouter(<SkillCard skill={mockSkill} href="/skills/test" />);
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should have correct href attribute', () => {
      renderWithRouter(<SkillCard skill={mockSkill} href="/skills/test" />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/skills/test');
    });
  });

  describe('accessibility', () => {
    it('should have correct aria-labelledby', () => {
      renderWithRouter(<SkillCard skill={mockSkill} />);
      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-labelledby', `${mockSkill.id}-title`);
    });

    it('should have correct aria-describedby', () => {
      renderWithRouter(<SkillCard skill={mockSkill} />);
      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-describedby', `${mockSkill.id}-desc`);
    });

    it('should have accessible name', () => {
      renderWithRouter(<SkillCard skill={mockSkill} />);
      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-label', expect.stringContaining(mockSkill.name));
    });

    it('should be focusable', () => {
      renderWithRouter(<SkillCard skill={mockSkill} />);
      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('tabindex', '0');
    });
  });

  describe('custom roleColor', () => {
    it('should apply custom roleColor if provided', () => {
      renderWithRouter(<SkillCard skill={mockSkill} roleColor="#ff0000" />);
      const roleBadge = screen.getByText(mockSkill.role);
      expect(roleBadge.style.backgroundColor).toBeTruthy();
    });
  });
});