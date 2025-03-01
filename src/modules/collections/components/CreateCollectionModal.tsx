import { Input } from 'antd';
import { FC, useState } from 'react';
import { GenericModal } from '../../../shared/components/GenericModal';

interface CreateCollectionModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

export const CreateCollectionModal: FC<CreateCollectionModalProps> = ({
  visible,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState('');

  const handleCreate = () => {
    if (name.trim()) {
      onCreate(name);
      setName('');
      onClose();
    }
  };

  return (
    <GenericModal
      visible={visible}
      title='New collection'
      onClose={onClose}
      onSubmit={handleCreate}
      submitText='Create'
      cancelText='Cancel'
    >
      <Input
        placeholder='Collection name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </GenericModal>
  );
};
