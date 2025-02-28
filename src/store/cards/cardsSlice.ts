import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Card {
  id: string;
  name: string;
  imageUrl: string;
}

interface CardsState {
  cards: Card[];
  loading: boolean;
  error: string | null;
}

const initialState: CardsState = {
  cards: [],
  loading: false,
  error: null,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    fetchCardsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCardsSuccess: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
      state.loading = false;
    },
    fetchCardsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCardsStart, fetchCardsSuccess, fetchCardsFailure } =
  cardsSlice.actions;
export default cardsSlice.reducer;
