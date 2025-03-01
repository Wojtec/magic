import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Card } from './Card';

jest.mock('./Card.module.scss', () => ({
  cardButton: 'cardButton',
  background: 'background',
  buttonsContainer: 'buttonsContainer',
}));

describe('Card Component', () => {
  const mockOnClick = jest.fn();
  const mockButtonClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders label and background correctly', () => {
    render(<Card label='Test Card' background={<div>Background</div>} />);
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Background')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    render(<Card label='Test Card' onClick={mockOnClick} />);
    fireEvent.click(screen.getByRole('button', { name: /Test Card/i }));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('has button role and is focusable', () => {
    render(<Card label='Test Card' />);
    const card = screen.getByRole('button', { name: /Test Card/i });
    expect(card).toHaveAttribute('role', 'button');
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  it('shows buttons container when hovered', () => {
    const buttons = [
      { label: 'Edit', onClick: mockButtonClick },
      { label: 'Delete', onClick: mockButtonClick },
    ];
    render(<Card label='Test Card' buttons={buttons} />);

    const card = screen.getByRole('button', { name: /Test Card/i });

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();

    fireEvent.mouseEnter(card);
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();

    fireEvent.mouseLeave(card);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('calls button onClick when a button is clicked', () => {
    const buttons = [{ label: 'Edit', onClick: mockButtonClick }];
    render(<Card label='Test Card' buttons={buttons} />);

    const card = screen.getByRole('button', { name: /Test Card/i });
    fireEvent.mouseEnter(card);
    fireEvent.click(screen.getByText('Edit'));
    expect(mockButtonClick).toHaveBeenCalledTimes(1);
  });

  it('renders without background and buttons when not provided', () => {
    render(<Card label='Test Card' />);
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.queryByText('Background')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Edit/i })
    ).not.toBeInTheDocument();
  });
});
