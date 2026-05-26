import ReviewRating from '../components/ReviewRating';

import Spinner from '../components/Spinner';
import SubmitReview from '../components/SubmitReview';
import { Error } from './Error';
import {
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  StackSeparator,
  Text
} from '@chakra-ui/react';
import { gql, type TypedDocumentNode } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useParams } from 'react-router-dom';
import type {
  GetLocationDetailsQuery,
  GetLocationDetailsQueryVariables
} from '@/gql/types';

export const GET_LOCATION_DETAILS: TypedDocumentNode<
  GetLocationDetailsQuery,
  GetLocationDetailsQueryVariables
> = gql`
  "Shows details and reviews for a space travel location."
  query GetLocationDetails($locationId: ID!) @tool {
    location(id: $locationId) {
      id
      name
      description
      photo
      overallRating
      reviewsForLocation {
        id
        comment
        rating
      }
    }
  }
`;

export default function Location() {
  const { id } = useParams() as { id: string };

  const { loading, error, data } = useQuery(GET_LOCATION_DETAILS, {
    variables: { locationId: id }
  });
  if (loading) return <Spinner />;
  if (error) return <Error error={error.message} />;

  const {
    name,
    description,
    photo,
    reviewsForLocation = [],
    overallRating
  } = data?.location ?? {};
  const reviews = reviewsForLocation.filter((review) => review != null);

  return (
    <>
      {data && (
        <Stack direction="column" px="8" gap="8" mb="12">
          <Stack direction="column" gap="3">
            <Heading size="3xl">{name}</Heading>
            <HStack>
              <ReviewRating isHalf size={16} rating={overallRating || 0} />
              <Text>
                {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </Text>
            </HStack>
          </Stack>

          <Stack direction="column" gap="3">
            <Heading size="xl">About this location</Heading>
            <Text fontSize="lg">{description}</Text>
          </Stack>

          <Flex direction="row">
            <Stack flex="1" direction="column" gap="8">
              <Stack
                direction="column"
                gap="2"
                separator={<StackSeparator borderColor="gray.200" />}
              >
                <Heading size="xl">Traveler reviews</Heading>
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

              <Stack direction="column" gap="4">
                <Heading size="xl">Add your review</Heading>
                <SubmitReview locationId={id} />
              </Stack>

              <Stack direction="column" gap="3">
                <Heading size="xl">Destination photo</Heading>
                <Image
                  src={photo}
                  alt={name}
                  borderRadius="image"
                  objectFit="cover"
                  width="100%"
                  height="240px"
                />
              </Stack>
            </Stack>
          </Flex>
        </Stack>
      )}
    </>
  );
}
