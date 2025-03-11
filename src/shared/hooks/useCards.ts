import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchCards } from '../../store/cards/cardsThunks';

export const useCards = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cards, loading, error } = useSelector(
    (state: RootState) => state.cards
  );

  const loadCards = useCallback(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  return {
    cards,
    loading,
    error,
    loadCards,
  };
};
