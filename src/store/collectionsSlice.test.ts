import collectionsReducer, {
  addCardToCollection,
  CollectionsState,
  createCollection,
  deleteCollection,
  removeCardFromCollection,
} from './collectionsSlice';

describe('collectionsSlice', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('createCollection adds a new collection', () => {
    const initialState: CollectionsState = { collections: [] };
    const mockTimestamp = 1234567890;

    jest.spyOn(Date, 'now').mockReturnValue(mockTimestamp);

    const newState = collectionsReducer(
      initialState,
      createCollection('New Collection')
    );

    expect(newState.collections).toHaveLength(1);
    expect(newState.collections[0]).toEqual({
      id: mockTimestamp.toString(),
      name: 'New Collection',
      cardIds: [],
    });
  });

  test('addCardToCollection adds a card to a specified collection', () => {
    const mockTimestamp = 1234567890;
    jest.spyOn(Date, 'now').mockReturnValue(mockTimestamp);

    let state: CollectionsState = { collections: [] };
    state = collectionsReducer(state, createCollection('Collection 1'));
    const collectionId = state.collections[0].id;

    state = collectionsReducer(
      state,
      addCardToCollection({ collectionId, cardId: 'card1' })
    );
    expect(state.collections[0].cardIds).toContain('card1');

    state = collectionsReducer(
      state,
      addCardToCollection({ collectionId, cardId: 'card1' })
    );
    expect(state.collections[0].cardIds).toEqual(['card1']);

    state = collectionsReducer(
      state,
      addCardToCollection({ collectionId, cardId: 'card2' })
    );
    expect(state.collections[0].cardIds).toEqual(['card1', 'card2']);

    state = collectionsReducer(
      state,
      addCardToCollection({ collectionId: 'doesNotExist', cardId: 'card3' })
    );
    expect(state.collections[0].cardIds).toEqual(['card1', 'card2']);
  });

  test('removeCardFromCollection removes a card from a specified collection', () => {
    const mockTimestamp = 1234567890;
    jest.spyOn(Date, 'now').mockReturnValue(mockTimestamp);

    let state: CollectionsState = { collections: [] };
    state = collectionsReducer(state, createCollection('Collection 1'));
    const collectionId = state.collections[0].id;
    state = collectionsReducer(
      state,
      addCardToCollection({ collectionId, cardId: 'card1' })
    );
    state = collectionsReducer(
      state,
      addCardToCollection({ collectionId, cardId: 'card2' })
    );

    state = collectionsReducer(
      state,
      removeCardFromCollection({ collectionId, cardId: 'card1' })
    );
    expect(state.collections[0].cardIds).toEqual(['card2']);

    state = collectionsReducer(
      state,
      removeCardFromCollection({ collectionId, cardId: 'card3' })
    );
    expect(state.collections[0].cardIds).toEqual(['card2']);

    state = collectionsReducer(
      state,
      removeCardFromCollection({
        collectionId: 'doesNotExist',
        cardId: 'card2',
      })
    );
    expect(state.collections[0].cardIds).toEqual(['card2']);
  });

  test('deleteCollection removes a specified collection', () => {
    const mockTimestamp1 = 1234567890;
    const mockTimestamp2 = 1234567891;

    let state: CollectionsState = { collections: [] };

    jest.spyOn(Date, 'now').mockReturnValue(mockTimestamp1);
    state = collectionsReducer(state, createCollection('Collection 1'));
    jest.spyOn(Date, 'now').mockReturnValue(mockTimestamp2);
    state = collectionsReducer(state, createCollection('Collection 2'));

    const collectionId1 = state.collections[1].id;
    const collectionId2 = state.collections[0].id;

    state = collectionsReducer(state, deleteCollection(collectionId1));
    expect(state.collections).toHaveLength(1);
    expect(state.collections[0].id).toBe(collectionId2);
    expect(state.collections[0].name).toBe('Collection 2');

    state = collectionsReducer(state, deleteCollection('doesNotExist'));
    expect(state.collections).toHaveLength(1);
  });
});
