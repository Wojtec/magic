import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useCards } from '../../../shared/hooks/useCards';
import { useCollections } from '../hooks/useCollections';
import { CollectionDetails } from './CollectionDetails';

jest.mock('../../../shared/hooks/useCards');
jest.mock('../hooks/useCollections');
jest.mock('@ant-design/icons', () => ({
  DeleteOutlined: ({ onClick }: { onClick?: () => void }) => (
    <span data-testid='delete-icon' onClick={onClick}>
      Delete
    </span>
  ),
}));

const mockUseCards = useCards as jest.Mock;
const mockUseCollections = useCollections as jest.Mock;

describe('CollectionDetails', () => {
  beforeEach(() => {
    mockUseCards.mockReturnValue({
      cards: [
        { id: '1', name: 'Card 1', imageUrl: 'url1' },
        { id: '2', name: 'Card 2', imageUrl: 'url2' },
      ],
      loading: false,
      error: null,
      loadCards: jest.fn(),
    });
    mockUseCollections.mockReturnValue({
      collections: [{ id: '1', name: 'Collection 1', cardIds: ['1'] }],
      addCardToCollection: jest.fn(),
      removeCardFromCollection: jest.fn(),
    });
  });

  test('renders collection details correctly', () => {
    render(
      <MemoryRouter
        initialEntries={['/collection/1']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path='/collection/:id' element={<CollectionDetails />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Collection Collection 1')).toBeInTheDocument();
    const card1Elements = screen.getAllByText('Card 1');
    expect(card1Elements).toHaveLength(2);
    expect(screen.getByText('Card 2')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });

  test('displays loading state', () => {
    mockUseCards.mockReturnValue({
      cards: [],
      loading: true,
      error: null,
      loadCards: jest.fn(),
    });
    render(
      <MemoryRouter
        initialEntries={['/collection/1']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path='/collection/:id' element={<CollectionDetails />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error state', () => {
    mockUseCards.mockReturnValue({
      cards: [],
      loading: false,
      error: 'Failed to load cards',
      loadCards: jest.fn(),
    });
    render(
      <MemoryRouter
        initialEntries={['/collection/1']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path='/collection/:id' element={<CollectionDetails />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Error: Failed to load cards')).toBeInTheDocument();
  });

  test('displays not found state', () => {
    mockUseCollections.mockReturnValue({
      collections: [],
      addCardToCollection: jest.fn(),
      removeCardFromCollection: jest.fn(),
    });
    render(
      <MemoryRouter
        initialEntries={['/collection/1']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path='/collection/:id' element={<CollectionDetails />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Collection not found')).toBeInTheDocument();
  });

  test('adds card to favorites when clicked', () => {
    render(
      <MemoryRouter
        initialEntries={['/collection/1']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path='/collection/:id' element={<CollectionDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const card2 = screen.getByText('Card 2');
    fireEvent.mouseEnter(card2);
    const favoriteButton = screen.getByText('Favorite', { selector: 'button' });
    fireEvent.click(favoriteButton);
    expect(mockUseCollections().addCardToCollection).toHaveBeenCalledWith(
      '1',
      '2'
    );
  });

  test('removes card from favorites when delete icon clicked', () => {
    render(
      <MemoryRouter
        initialEntries={['/collection/1']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path='/collection/:id' element={<CollectionDetails />} />
        </Routes>
      </MemoryRouter>
    );
    const deleteIcon = screen.getByTestId('delete-icon');
    fireEvent.click(deleteIcon);
    expect(mockUseCollections().removeCardFromCollection).toHaveBeenCalledWith(
      '1',
      '1'
    );
  });
});
