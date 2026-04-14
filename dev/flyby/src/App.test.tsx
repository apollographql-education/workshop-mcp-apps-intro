import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MockLink } from '@apollo/client/testing';
import { MockedProvider } from '@apollo/client/testing/react';
import { ChakraProvider } from '@chakra-ui/react';

MockLink.defaultOptions = { delay: 0 };
import App from './App';
import system from './theme.js';
import { GET_LATEST_REVIEWS_AND_LOCATIONS } from './pages/Homepage';

const mocks = [
  {
    request: { query: GET_LATEST_REVIEWS_AND_LOCATIONS },
    result: {
      data: {
        locations: [],
        latestReviews: []
      }
    }
  }
];

test('renders home page hero copy', async () => {
  render(
    <ChakraProvider value={system}>
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    </ChakraProvider>
  );
  // @ts-ignore
  expect(await screen.findByText(/galaxy far, far away/i)).toBeInTheDocument();
});
