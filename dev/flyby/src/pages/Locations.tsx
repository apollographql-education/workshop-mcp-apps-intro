import LocationCard from '../components/LocationCard';
import Spinner from '../components/Spinner';
import { Error } from './Error';

import { Heading, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import { gql, type TypedDocumentNode } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import type {
  GetLocationsToVisitQuery,
  GetLocationsToVisitQueryVariables
} from '@/gql/types';

export const GET_LOCATIONS_TO_VISIT: TypedDocumentNode<
  GetLocationsToVisitQuery,
  GetLocationsToVisitQueryVariables
> = gql`
  "Shows a focused list of locations to visit, without latest reviews."
  query GetLocationsToVisit @tool {
    locations {
      id
      name
      description
      overallRating
      reviewsForLocation {
        id
      }
    }
  }
`;

export default function Locations() {
  const { error, loading, data } = useQuery(GET_LOCATIONS_TO_VISIT);

  if (error) return <Error error={error.message} />;

  return (
    <Stack direction="column" gap="8">
      <VStack gap="2" py="10">
        <Heading size="5xl">Choose your next destination</Heading>
        <Text fontSize="2xl">
          Browse places to visit with the details that help you decide where to
          go next.
        </Text>
      </VStack>
      <Stack direction="column" gap="4">
        <Heading size="3xl">Locations to Visit</Heading>
        {loading ? (
          <Spinner />
        ) : (
          <SimpleGrid columns={[1, null, 2]} gap={4}>
            {data?.locations.map((location) => (
              <LocationCard
                key={location.id}
                {...location}
                showPhoto={false}
                showReviewSnippet={false}
              />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Stack>
  );
}
