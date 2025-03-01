import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { GenericModal } from './GenericModal';

jest.mock('antd', () => ({
  Modal: ({
    children,
    open,
    title,
    footer,
  }: {
    children: ReactNode;
    open: boolean;
    title: string;
    onCancel: () => void;
    footer: ReactNode[];
  }) =>
    open ? (
      <div data-testid='mock-modal'>
        <h1>{title}</h1>
        <div>{children}</div>
        <div data-testid='footer'>{footer}</div>
      </div>
    ) : null,
  Button: ({
    children,
    onClick,
  }: {
    children: ReactNode;
    onClick: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

describe('GenericModal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal with title and children when visible is true', () => {
    render(
      <GenericModal visible={true} title='Test Modal' onClose={mockOnClose}>
        <p>Test Content</p>
      </GenericModal>
    );
    expect(screen.getByTestId('mock-modal')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('does not render modal when visible is false', () => {
    render(
      <GenericModal visible={false} title='Test Modal' onClose={mockOnClose}>
        <p>Test Content</p>
      </GenericModal>
    );
    expect(screen.queryByTestId('mock-modal')).not.toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(
      <GenericModal visible={true} title='Test Modal' onClose={mockOnClose}>
        <p>Test Content</p>
      </GenericModal>
    );
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders submit button and calls onSubmit when clicked', () => {
    render(
      <GenericModal
        visible={true}
        title='Test Modal'
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        submitText='Confirm'
      >
        <p>Test Content</p>
      </GenericModal>
    );
    const submitButton = screen.getByText('Confirm');
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('uses default button texts when not provided', () => {
    render(
      <GenericModal
        visible={true}
        title='Test Modal'
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      >
        <p>Test Content</p>
      </GenericModal>
    );
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('does not render submit button when onSubmit is not provided', () => {
    render(
      <GenericModal visible={true} title='Test Modal' onClose={mockOnClose}>
        <p>Test Content</p>
      </GenericModal>
    );
    expect(screen.queryByText('Save')).not.toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('renders custom button texts when provided', () => {
    render(
      <GenericModal
        visible={true}
        title='Test Modal'
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        submitText='Confirm'
        cancelText='Close'
      >
        <p>Test Content</p>
      </GenericModal>
    );
    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });
});
