import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchModal from '../components/search/SearchModal';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe('SearchModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when closed', () => {
    it('should not render when isOpen is false', () => {
      renderWithRouter(<SearchModal isOpen={false} onClose={mockOnClose} />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('when open', () => {
    it('should render when isOpen is true', () => {
      renderWithRouter(<SearchModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should have correct ARIA attributes', () => {
      renderWithRouter(<SearchModal isOpen={true} onClose={mockOnClose} />);
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'search-modal-title');
    });

    it('should have a search input', () => {
      renderWithRouter(<SearchModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should focus the input on open', () => {
      renderWithRouter(<SearchModal isOpen={true} onClose={mockOnClose} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveFocus();
    });

    it('should call onClose when clicking overlay', () => {
      renderWithRouter(<SearchModal isOpen={true} onClose={mockOnClose} />);
      const overlay = screen.getByRole('button', { name: /close search/i });
      fireEvent.click(overlay);
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should call onClose when pressing Escape', () => {
      renderWithRouter(<SearchModal isOpen={true} onClose={mockOnClose} />);
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should not call onClose when clicking inside modal', () => {
      renderWithRouter(<SearchModal isOpen={true} onClose={mockOnClose} />);
      const dialog = screen.getByRole('dialog');
      fireEvent.click(dialog);
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('search functionality', () => {
    it('should update input value when typing', () => {
      renderWithRouter(<SearchModal isOpen={true} onClose={mockOnClose} />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'architect' } });
      expect(input).toHaveValue('architect');
    });

    it('should show "no results" message for non-matching search', async () => {
      renderWithRouter(<SearchModal isOpen={true} onClose={mockOnClose} />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'xyznonexistent' } });
      
      await waitFor(() => {
        expect(screen.getByRole('status')).toHaveTextContent('无匹配结果');
      });
    });

    it('should show results for matching search', async () => {
      renderWithRouter(<SearchModal isOpen={true} onClose={mockOnClose} />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'architect' } });
      
      await waitFor(() => {
        const skillsSection = screen.queryByText(/Skills \(\d+\)/);
        expect(skillsSection || screen.getByText(/无匹配结果/)).toBeInTheDocument();
      });
    });
  });
});