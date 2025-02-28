import { API } from '../../shared/configApi';
import {
  fetchCardsFailure,
  fetchCardsStart,
  fetchCardsSuccess,
} from './cardsSlice';
import { fetchCards } from './cardsThunks';

describe('fetchCards thunk', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should not fetch cards if cards are already in state', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      collections: { collections: [] },
      cards: {
        cards: [{ id: '1', name: 'Card 1', imageUrl: 'url1' }],
        loading: false,
        error: null,
      },
    }));

    await fetchCards()(dispatch, getState);

    expect(dispatch).not.toHaveBeenCalled();
    expect(getState).toHaveBeenCalledTimes(1);
  });

  test('should fetch cards successfully', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      collections: { collections: [] },
      cards: {
        cards: [],
        loading: false,
        error: null,
      },
    }));

    const mockCards = [
      { id: '1', name: 'Card 1', imageUrl: 'url1' },
      { id: '2', name: 'Card 2', imageUrl: 'url2' },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ cards: mockCards }),
      })
    ) as jest.Mock;

    await fetchCards()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(fetchCardsStart());
    expect(dispatch).toHaveBeenCalledWith(fetchCardsSuccess(mockCards));
    expect(global.fetch).toHaveBeenCalledWith(
      `${API.BASE_URL}${API.ENDPOINTS.CARDS}`
    );
  });

  test('should handle fetch cards failure', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      collections: { collections: [] },
      cards: {
        cards: [],
        loading: false,
        error: null,
      },
    }));

    const errorMessage = 'Network error';
    global.fetch = jest.fn(() =>
      Promise.reject(new Error(errorMessage))
    ) as jest.Mock;

    await fetchCards()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(fetchCardsStart());
    expect(dispatch).toHaveBeenCalledWith(fetchCardsFailure(errorMessage));
    expect(global.fetch).toHaveBeenCalledWith(
      `${API.BASE_URL}${API.ENDPOINTS.CARDS}`
    );
  });
});
