import Button from './Button';
import { useState, type ChangeEvent } from 'react';
import ReviewRating from './ReviewRating';
import { Flex, Stack, Text, Textarea } from '@chakra-ui/react';
import { GET_LOCATION_DETAILS } from '../pages/Location';
import { gql, type TypedDocumentNode } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type {
  SubmitReviewMutation,
  SubmitReviewMutationVariables
} from '@/gql/types';

export const SUBMIT_REVIEW: TypedDocumentNode<
  SubmitReviewMutation,
  SubmitReviewMutationVariables
> = gql`
  "Submits a new review with a rating and comment for a location."
  mutation SubmitReview($locationReview: LocationReviewInput!) @tool {
    submitReview(locationReview: $locationReview) {
      code
      success
      message
      locationReview {
        id
        comment
        rating
      }
    }
  }
`;

interface SubmitReviewProps {
  locationId: string;
}

export default function SubmitReview({ locationId }: SubmitReviewProps) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setComment(event.target.value);

  const [submitReview] = useMutation(SUBMIT_REVIEW, {
    variables: {
      locationReview: { comment, rating: rating!, locationId }
    },
    refetchQueries: [
      { query: GET_LOCATION_DETAILS, variables: { locationId } }, // DocumentNode object parsed with gql
      'getLocationDetails' // Query name
    ],
    onCompleted: () => setHasSubmittedForm(true)
  });

  return !hasSubmittedForm ? (
    <Stack>
      <Stack direction="column" gap="4">
        <ReviewRating rating={rating} setReviewsInput={setRating} edit />
        <Textarea
          placeholder="Write your review here"
          size="lg"
          value={comment}
          onChange={handleChange}
        />
      </Stack>
      <Flex justify="right">
        <Button disabled={!rating || !comment} onClick={() => submitReview()}>
          Submit Review
        </Button>
      </Flex>
    </Stack>
  ) : (
    <Text as="i">Thanks for writing a review!</Text>
  );
}
