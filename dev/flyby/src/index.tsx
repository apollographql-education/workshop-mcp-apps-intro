import App from './App';
import { StrictMode, Suspense } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { ApolloProvider } from '@apollo/client/react';
import { createRoot } from 'react-dom/client';
import { fragments } from './apollo/fragmentRegistry.js';
import theme from './theme.js';
import { ChakraProvider, Spinner, Center } from '@chakra-ui/react';

const graphqlUri =
  import.meta.env.VITE_GRAPHQL_ENDPOINT ??
  'https://flyby-edu-router.up.railway.app/';

const httpLink = new HttpLink({ uri: graphqlUri });

const cache = new InMemoryCache({
  fragments
});

const client = new ApolloClient({
  link: httpLink,
  cache,
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
