import { PlusOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { Header } from '../../../shared/components/Header';
import { CreateCollectionModal } from '../components/CreateCollectionModal';
import { useCollections } from '../hooks/useCollections';
import style from './CollectionsPage.module.scss';

export const CollectionsPage: FC = () => {
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const { collections, createCollection, deleteCollection } = useCollections();
  const handleCreateCollection = (name: string) => createCollection(name);
  const navigateTo = (path: string) => navigate(path);

  return (
    <section className={style.container}>
      <Header level={1}>My collections</Header>
      <ul className={style.collectionsGrid}>
        <li>
          <Card
            label='Create collection'
            onClick={() => setIsModalVisible(true)}
            background={<PlusOutlined className={style.plusIcon} />}
            aria-label='Create new collection'
          />
        </li>
        {collections.map((collection) => (
          <li key={collection.id}>
            <Card
              label={collection.name}
              background={<img src='/assets/Cardback.png' alt='Card back' />}
              buttons={[
                {
                  label: 'Edit',
                  onClick: () => navigateTo(`/collection/${collection.id}`),
                },
                {
                  label: 'Delete',
                  onClick: () => deleteCollection(collection.id),
                },
              ]}
            />
          </li>
        ))}
      </ul>
      <CreateCollectionModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onCreate={handleCreateCollection}
      />
    </section>
  );
};
