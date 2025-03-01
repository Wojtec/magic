import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';

describe('Layout Component', () => {
  it('renders the header with the correct title', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const headerElement = screen.getByText('Magic The Gathering Collections');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.tagName).toBe('H1');
  });

  it('renders children inside the main section', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    const mainElement = screen.getByRole('main');
    const contentElement = screen.getByText('Test Content');
    expect(mainElement).toContainElement(contentElement);
  });

  it('applies correct layout classes', () => {
    const { container } = render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    const layoutElement = container.firstChild;
    expect(layoutElement).toHaveClass('layout');
    expect(screen.getByRole('main')).toHaveClass('main');
    expect(screen.getByText('Magic The Gathering Collections')).toHaveClass(
      'title'
    );
  });
});
