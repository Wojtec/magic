import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchCards } from '../../store/cards/cardsThunks';

export const useCards = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cards, loading, error } = useSelector(
    (state: RootState) => state.cards
  );

  const loadCards = () => {
    dispatch(fetchCards());
  };

  return {
    cards,
    loading,
    error,
    loadCards,
  };
};
