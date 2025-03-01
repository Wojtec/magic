import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { CreateCollectionModal } from './CreateCollectionModal';

jest.mock('../../../shared/components/GenericModal', () => ({
  GenericModal: ({
    children,
    onSubmit,
    onClose,
    title,
    submitText,
    cancelText,
  }: {
    children: React.ReactNode;
    onSubmit: () => void;
    onClose: () => void;
    title: string;
    submitText: string;
    cancelText: string;
  }) => (
    <div>
      <h1>{title}</h1>
      {children}
      <button onClick={onSubmit}>{submitText}</button>
      <button onClick={onClose}>{cancelText}</button>
    </div>
  ),
}));

jest.mock('antd', () => ({
  Input: ({
    placeholder,
    value,
    onChange,
  }: {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => <input placeholder={placeholder} value={value} onChange={onChange} />,
}));

describe('CreateCollectionModal', () => {
  test('renders modal with input and buttons', () => {
    render(
      <CreateCollectionModal
        visible={true}
        onClose={() => {}}
        onCreate={() => {}}
      />
    );
    expect(screen.getByText('New collection')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Collection name')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('calls onCreate with the name after clicking Create', () => {
    const onCreate = jest.fn();
    const onClose = jest.fn();
    render(
      <CreateCollectionModal
        visible={true}
        onClose={onClose}
        onCreate={onCreate}
      />
    );

    const input = screen.getByPlaceholderText('Collection name');
    fireEvent.change(input, { target: { value: 'My collection' } });

    const createButton = screen.getByText('Create');
    fireEvent.click(createButton);

    expect(onCreate).toHaveBeenCalledWith('My collection');
    expect(onClose).toHaveBeenCalled();
  });

  test('does not call onCreate if the name is empty', () => {
    const onCreate = jest.fn();
    const onClose = jest.fn();
    render(
      <CreateCollectionModal
        visible={true}
        onClose={onClose}
        onCreate={onCreate}
      />
    );

    const createButton = screen.getByText('Create');
    fireEvent.click(createButton);

    expect(onCreate).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });
});
