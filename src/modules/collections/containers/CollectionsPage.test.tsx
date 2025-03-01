import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useCollections } from '../hooks/useCollections';
import { CollectionsPage } from './CollectionsPage';

jest.mock('../hooks/useCollections');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('CollectionsPage', () => {
  const mockCreateCollection = jest.fn();
  const mockDeleteCollection = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCollections as jest.Mock).mockReturnValue({
      collections: [
        { id: '1', name: 'First Collection' },
        { id: '2', name: 'Second Collection' },
      ],
      createCollection: mockCreateCollection,
      deleteCollection: mockDeleteCollection,
    });
  });

  it('renders the collections page correctly', () => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <CollectionsPage />
      </MemoryRouter>
    );

    expect(screen.getByText('My collections')).toBeInTheDocument();
    expect(screen.getByText('First Collection')).toBeInTheDocument();
    expect(screen.getByText('Second Collection')).toBeInTheDocument();
    expect(screen.getByText('Create collection')).toBeInTheDocument();
  });

  it('opens modal when clicking on create collection card', () => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <CollectionsPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Create collection'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls deleteCollection when delete button is clicked', () => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <CollectionsPage />
      </MemoryRouter>
    );

    const firstCollection = screen.getByText('First Collection').closest('div');
    fireEvent.mouseEnter(firstCollection!);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(mockDeleteCollection).toHaveBeenCalledWith('1');
  });

  it('navigates to collection page when edit button is clicked', () => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <CollectionsPage />
      </MemoryRouter>
    );

    const firstCollection = screen.getByText('First Collection').closest('div');
    fireEvent.mouseEnter(firstCollection!);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    expect(mockNavigate).toHaveBeenCalledWith('/collection/1');
  });
});
