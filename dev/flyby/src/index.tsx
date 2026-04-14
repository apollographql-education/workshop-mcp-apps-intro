import App from './App';
import { StrictMode, Suspense } from 'react';
import { InMemoryCache } from '@apollo/client';
import { ApolloClient } from '@apollo/client-ai-apps';
import { ApolloProvider } from '@apollo/client-ai-apps/react';
import { createRoot } from 'react-dom/client';
import manifest from '../.application-manifest.json';
import { fragments } from './apollo/fragmentRegistry.js';
import theme from './theme.js';
import { ChakraProvider, Spinner, Center } from '@chakra-ui/react';

const cache = new InMemoryCache({
  fragments
});

const client = new ApolloClient({
  cache,
  manifest,
  dataMasking: true
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider value={theme}>
        <Suspense
          fallback={
            <Center minH="40vh">
              <Spinner size="xl" />
            </Center>
          }
        >
          <App />
        </Suspense>
      </ChakraProvider>
    </ApolloProvider>
  </StrictMode>
);
