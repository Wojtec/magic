import { DeleteOutlined } from '@ant-design/icons';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { Header } from '../../../shared/components/Header';
import { useCards } from '../../../shared/hooks/useCards';
import { useCollections } from '../hooks/useCollections';
import style from './CollectionDetails.module.scss';

export const CollectionDetails: FC = () => {
  const { cards, loading, error, loadCards } = useCards();
  const { addCardToCollection, collections, removeCardFromCollection } =
    useCollections();
  const { id } = useParams<{ id: string }>();
  const collection = collections.find((c) => c.id === id);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const favoriteCards = useMemo(() => {
    if (!collection) return [];
    return cards.filter((card) => collection.cardIds.includes(card.id));
  }, [cards, collection]);

  const handleAddFavorite = (cardId: string) => {
    if (id) {
      addCardToCollection(id, cardId);
    } else {
      console.error('Collection ID undefined!');
    }
  };

  const handleRemoveFavorite = (cardId: string) => {
    if (id) {
      removeCardFromCollection(id, cardId);
    } else {
      console.error('Collection ID undefined!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!collection) return <div>Collection not found</div>;

  return (
    <section className={style.container}>
      <Header level={1}>Collection {collection.name}</Header>

      <div className={style.columns}>
        <section className={style.cards}>
          {cards.map((card) => (
            <Card
              key={card.id}
              label={card.name}
              background={
                <img
                  src={`${card.imageUrl || '/assets/Cardback.png'}`}
                  alt='Card back'
                />
              }
              buttons={[
                {
                  label: 'Favorite',
                  onClick: () => handleAddFavorite(card.id),
                },
              ]}
            />
          ))}
        </section>
        <aside className={style.favorites}>
          <Header level={2}>Favorites</Header>
          <ul>
            {favoriteCards.map((card) => (
              <li key={card.id}>
                <span>{card.name}</span>
                <DeleteOutlined onClick={() => handleRemoveFavorite(card.id)} />
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
};
