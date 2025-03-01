import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards } from '../../store/cards/cardsThunks';
import { useCards } from './useCards';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../store/cards/cardsThunks', () => ({
  fetchCards: jest.fn(),
}));

describe('useCards hook', () => {
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('should return cards, loading, error, and loadCards', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        cards: {
          cards: ['card1', 'card2'],
          loading: false,
          error: null,
        },
      })
    );

    const TestComponent = () => {
      const { cards, loading, error, loadCards } = useCards();

      return (
        <div>
          <div data-testid='cards'>{cards.join(', ')}</div>
          <div data-testid='loading'>{loading ? 'Loading' : 'Not Loading'}</div>
          <div data-testid='error'>{error || ''}</div>
          <button onClick={loadCards}>Load Cards</button>
        </div>
      );
    };

    render(<TestComponent />);

    expect(screen.getByTestId('cards').textContent).toBe('card1, card2');
    expect(screen.getByTestId('loading').textContent).toBe('Not Loading');
    expect(screen.getByTestId('error').textContent).toBe('');

    fireEvent.click(screen.getByText('Load Cards'));
    expect(mockDispatch).toHaveBeenCalledWith(fetchCards());
  });
});
