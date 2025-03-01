import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Collection {
  id: string;
  name: string;
  cardIds: string[];
}

export interface CollectionsState {
  collections: Collection[];
}

const initialState: CollectionsState = {
  collections: [],
};

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    createCollection: (state, action: PayloadAction<string>) => {
      const newCollection: Collection = {
        id: Date.now().toString(),
        name: action.payload,
        cardIds: [],
      };
      state.collections.unshift(newCollection);
    },
    addCardToCollection: (
      state,
      action: PayloadAction<{ collectionId: string; cardId: string }>
    ) => {
      const collection = state.collections.find(
        (c) => c.id === action.payload.collectionId
      );
      if (collection && !collection.cardIds.includes(action.payload.cardId)) {
        collection.cardIds.push(action.payload.cardId);
      }
    },
    removeCardFromCollection: (
      state,
      action: PayloadAction<{ collectionId: string; cardId: string }>
    ) => {
      const collection = state.collections.find(
        (c) => c.id === action.payload.collectionId
      );
      if (collection) {
        collection.cardIds = collection.cardIds.filter(
          (id) => id !== action.payload.cardId
        );
      }
    },
    deleteCollection: (state, action: PayloadAction<string>) => {
      state.collections = state.collections.filter(
        (c) => c.id !== action.payload
      );
    },
  },
});

export const {
  createCollection,
  addCardToCollection,
  removeCardFromCollection,
  deleteCollection,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
