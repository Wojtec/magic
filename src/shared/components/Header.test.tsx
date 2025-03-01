import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header Component', () => {
  it('renders an h1 by default when no level is provided', () => {
    render(<Header>Test Header</Header>);
    const headerElement = screen.getByText('Test Header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.tagName).toBe('H1');
  });

  it('renders an h2 when level is 2', () => {
    render(<Header level={2}>Test Header</Header>);
    const headerElement = screen.getByText('Test Header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.tagName).toBe('H2');
  });

  it('renders an h3 when level is 3', () => {
    render(<Header level={3}>Test Header</Header>);
    const headerElement = screen.getByText('Test Header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.tagName).toBe('H3');
  });

  it('renders an h4 when level is 4', () => {
    render(<Header level={4}>Test Header</Header>);
    const headerElement = screen.getByText('Test Header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.tagName).toBe('H4');
  });

  it('renders an h5 when level is 5', () => {
    render(<Header level={5}>Test Header</Header>);
    const headerElement = screen.getByText('Test Header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.tagName).toBe('H5');
  });

  it('renders the children content', () => {
    render(<Header level={2}>Test Content</Header>);
    const contentElement = screen.getByText('Test Content');
    expect(contentElement).toBeInTheDocument();
  });
});
