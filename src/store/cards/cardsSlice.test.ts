import cardsReducer, {
  fetchCardsFailure,
  fetchCardsStart,
  fetchCardsSuccess,
} from './cardsSlice';

describe('cardsSlice', () => {
  const initialState = {
    cards: [],
    loading: false,
    error: null,
  };

  it('should handle fetchCardsStart', () => {
    const nextState = cardsReducer(initialState, fetchCardsStart());
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it('should handle fetchCardsSuccess', () => {
    const fakeCards = [
      { id: '1', name: 'Card 1', imageUrl: 'image1.jpg' },
      { id: '2', name: 'Card 2', imageUrl: 'image2.jpg' },
    ];
    const nextState = cardsReducer(initialState, fetchCardsSuccess(fakeCards));
    expect(nextState.cards).toEqual(fakeCards);
    expect(nextState.loading).toBe(false);
  });

  it('should handle fetchCardsFailure', () => {
    const errorMessage = 'Failed to fetch cards';
    const nextState = cardsReducer(
      initialState,
      fetchCardsFailure(errorMessage)
    );
    expect(nextState.error).toBe(errorMessage);
    expect(nextState.loading).toBe(false);
  });
});
