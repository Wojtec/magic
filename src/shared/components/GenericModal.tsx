import { Button, Modal } from 'antd';
import { FC, ReactNode } from 'react';

interface GenericModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  onSubmit?: () => void;
  submitText?: string;
  cancelText?: string;
  children: ReactNode;
}

export const GenericModal: FC<GenericModalProps> = ({
  visible,
  title,
  onClose,
  onSubmit,
  submitText = 'Save',
  cancelText = 'Cancel',
  children,
}) => {
  return (
    <Modal
      open={visible}
      title={title}
      onCancel={onClose}
      footer={[
        <Button key='cancel' onClick={onClose}>
          {cancelText}
        </Button>,
        onSubmit && (
          <Button key='submit' onClick={onSubmit}>
            {submitText}
          </Button>
        ),
      ].filter(Boolean)}
    >
      {children}
    </Modal>
  );
};
