import { Selector } from '@reduxjs/toolkit';
import { RootState, useAppDispatch, useAppSelector } from '../../../store';
import { useCollections } from './useCollections';

jest.mock('../../../store', () => ({
  useAppDispatch: jest.fn(() => jest.fn()),
  useAppSelector: jest.fn(),
}));

jest.mock('../../../store/collectionsSlice', () => ({
  addCardToCollection: jest.fn(),
  createCollection: jest.fn(),
  deleteCollection: jest.fn(),
  removeCardFromCollection: jest.fn(),
}));

const fakeCollection = { collectionId: '1', cardId: 'card123' };

describe('useCollections hook', () => {
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockImplementation(
      (selector: Selector<RootState>) =>
        selector({
          collections: {
            collections: [{ id: '1', name: 'Test Collection', cardIds: [] }],
          },
          cards: { cards: [], loading: true, error: '' },
        })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns collections and action functions', () => {
    const result = useCollections();

    expect(result).toHaveProperty('collections');
    expect(result.collections).toEqual([
      { id: '1', name: 'Test Collection', cardIds: [] },
    ]);
    expect(result).toHaveProperty('createCollection');
    expect(result).toHaveProperty('addCardToCollection');
    expect(result).toHaveProperty('removeCardFromCollection');
    expect(result).toHaveProperty('deleteCollection');
  });

  it('dispatches createCollection action with correct name', () => {
    const { createCollection } = useCollections();

    createCollection('New Collection');
    expect(mockDispatch).toHaveBeenCalledWith(
      createCollection('New Collection')
    );
  });

  it('dispatches addCardToCollection action with correct parameters', () => {
    const { addCardToCollection } = useCollections();

    addCardToCollection('1', 'card123');
    expect(mockDispatch).toHaveBeenCalledWith(
      addCardToCollection(fakeCollection.collectionId, fakeCollection.cardId)
    );
  });

  it('dispatches removeCardFromCollection action with correct parameters', () => {
    const { removeCardFromCollection } = useCollections();

    removeCardFromCollection('1', 'card123');
    expect(mockDispatch).toHaveBeenCalledWith(
      removeCardFromCollection(
        fakeCollection.collectionId,
        fakeCollection.cardId
      )
    );
  });

  it('dispatches deleteCollection action with correct collectionId', () => {
    const { deleteCollection } = useCollections();

    deleteCollection('1');
    expect(mockDispatch).toHaveBeenCalledWith(deleteCollection('1'));
  });
});
