import ReviewRating from '../components/ReviewRating';
import Spinner from '../components/Spinner';
import { Error } from './Error';

import { Heading, HStack, Stack, StackSeparator, Text } from '@chakra-ui/react';
import { gql, type TypedDocumentNode } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useParams } from 'react-router-dom';
import type {
  GetLocationReviewsQuery,
  GetLocationReviewsQueryVariables
} from '@/gql/types';

export const GET_LOCATION_REVIEWS: TypedDocumentNode<
  GetLocationReviewsQuery,
  GetLocationReviewsQueryVariables
> = gql`
  query GetLocationReviews($locationId: ID!) {
    location(id: $locationId) {
      id
      name
      overallRating
      reviewsForLocation {
        id
        comment
        rating
      }
    }
  }
`;

export default function LocationReviews() {
  const { id } = useParams() as { id: string };

  const { loading, error, data } = useQuery(GET_LOCATION_REVIEWS, {
    variables: { locationId: id }
  });
  if (loading) return <Spinner />;
  if (error) return <Error error={error.message} />;

  const { name, reviewsForLocation = [], overallRating } = data?.location ?? {};
  const reviews = reviewsForLocation.filter((review) => review != null);

  return (
    <>
      {data && (
        <Stack direction="column" px="8" gap="6" mb="12">
          <Stack direction="column" gap="3">
            <Heading size="3xl">Reviews for {name}</Heading>
            <Text fontSize="lg">
              Review submitted. Here&apos;s what travelers are saying now.
            </Text>
            <HStack>
              <ReviewRating isHalf size={16} rating={overallRating || 0} />
              <Text>
                {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </Text>
            </HStack>
          </Stack>

          <Stack
            direction="column"
            gap="2"
            separator={<StackSeparator borderColor="gray.200" />}
          >
            {reviews.length === 0 ? (
              <Text>No reviews yet</Text>
            ) : (
              reviews.map((review) => (
                <Stack direction="column" gap="1" key={review.id} py="4">
                  <ReviewRating size={16} rating={review.rating} />
                  <Text>{review.comment}</Text>
                </Stack>
              ))
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
}
