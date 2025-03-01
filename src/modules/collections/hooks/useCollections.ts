import { useAppDispatch, useAppSelector } from '../../../store';
import {
  addCardToCollection,
  createCollection,
  deleteCollection,
  removeCardFromCollection,
} from '../../../store/collectionsSlice';

export const useCollections = () => {
  const dispatch = useAppDispatch();
  const collections = useAppSelector((state) => state.collections.collections);

  return {
    collections,
    createCollection: (name: string) => dispatch(createCollection(name)),
    addCardToCollection: (collectionId: string, cardId: string) =>
      dispatch(addCardToCollection({ collectionId, cardId })),
    removeCardFromCollection: (collectionId: string, cardId: string) =>
      dispatch(removeCardFromCollection({ collectionId, cardId })),
    deleteCollection: (collectionId: string) =>
      dispatch(deleteCollection(collectionId)),
  };
};
