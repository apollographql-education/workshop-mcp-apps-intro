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

  return (
    <>
      {data && (
        <Stack direction="column" px="12" gap="6" mb="12">
          <Heading size="3xl">{name}</Heading>
          <HStack>
            <ReviewRating isHalf size={16} rating={overallRating || 0} />{' '}
            <div>({reviewsForLocation.length})</div>
          </HStack>
          <Stack direction="column" gap="6">
            <Image
              src={photo}
              alt={name}
              objectFit="cover"
              width="100%"
              height="500px"
            />
            <Flex direction="column" justify="space-between">
              <Heading py="4" size="xl" mb="2">
                About this location
              </Heading>
              <Text mr="1">{description}</Text>
            </Flex>
          </Stack>
          <Flex direction="row">
            <Stack flex="1" direction="column" gap="12">
              <Stack
                direction="column"
                gap="4"
                separator={<StackSeparator borderColor="gray.200" />}
              >
                <Heading size="xl" mb="2" marginTop={8}>
                  What other space travelers have to say
                </Heading>
                {reviewsForLocation.length === 0 ? (
                  <Text>No reviews yet</Text>
                ) : (
                  reviewsForLocation.map((review, i) => {
                    if (review == null) {
                      return null;
                    }

                    return (
                      <Stack
                        direction="column"
                        gap="1"
                        key={`${i}-${review.rating}`}
                        py="8"
                      >
                        <ReviewRating size={16} rating={review.rating} />
                        <Text py="2">{review.comment}</Text>
                      </Stack>
                    );
                  })
                )}
              </Stack>
              <SubmitReview locationId={id} />
            </Stack>
          </Flex>
        </Stack>
      )}
    </>
  );
}
