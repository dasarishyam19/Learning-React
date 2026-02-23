import { screen } from '@testing-library/react';
import { render } from './test-utils';
import App from './App';

test('renders application header', () => {
  render(<App />);
  const headerElement = screen.getByText(/React Architecture Showcase/i);
  expect(headerElement).toBeInTheDocument();
});
