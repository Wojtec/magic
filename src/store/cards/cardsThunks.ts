import { Dispatch } from 'redux';
import { API } from '../../shared/configApi';
import { RootState } from '../../store';
import {
  fetchCardsFailure,
  fetchCardsStart,
  fetchCardsSuccess,
} from './cardsSlice';

export const fetchCards =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();

    if (state.cards.cards.length > 0) {
      return;
    }

    dispatch(fetchCardsStart());

    try {
      const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.CARDS}`);
      const data = await response.json();
      dispatch(fetchCardsSuccess(data.cards));
    } catch (error) {
      dispatch(fetchCardsFailure((error as Error).message));
    }
  };
