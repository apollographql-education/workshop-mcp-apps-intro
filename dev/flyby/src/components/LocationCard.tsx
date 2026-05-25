import Button from './Button';
import ReviewRating from './ReviewRating';
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useMediaQuery
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface LocationCardProps {
  id: string;
  name: string;
  description?: string;
  photo?: string;
  overallRating: number | null;
  reviewsForLocation: Array<{ id?: string; comment?: string | null } | null>;
  showPhoto?: boolean;
  showReviewSnippet?: boolean;
}

export default function LocationCard({
  id,
  name,
  description,
  photo,
  overallRating,
  reviewsForLocation = [],
  showPhoto = true,
  showReviewSnippet = true
}: LocationCardProps) {
  const { comment } = reviewsForLocation[0] ?? {};
  const reviewCount = reviewsForLocation.filter(Boolean).length;
  const [prefersReducedMotion] = useMediaQuery(
    ['(prefers-reduced-motion: reduce)'],
    { ssr: false }
  );

  const zoomAnimation = prefersReducedMotion
    ? {}
    : {
        transform: 'scale(1.1)',
        opacity: '100%'
      };

  return (
    <Box role="group" overflow="hidden" asChild>
      <Link to={`/location/${id}`}>
        {showPhoto && photo ? (
          <Box
            borderRadius="image"
            maxHeight="250px"
            width="100%"
            overflow="hidden"
          >
            <Image
              transition="0.3s all ease-in-out"
              opacity={'95%'}
              _groupHover={zoomAnimation}
              _groupFocus={zoomAnimation}
              src={photo}
              alt={name}
              objectFit="cover"
            />
          </Box>
        ) : null}
        <Flex direction="column" p="3" justify="space-between" minH="120px">
          <Heading size="xl" my="4">
            {name}
          </Heading>
          {showReviewSnippet && overallRating ? (
            <Flex direction="column" minH="100px" justify="space-between">
              <Text fontStyle="italic" lineClamp={2}>{`"${comment}"`}</Text>
              <Flex direction="row" py="4" justify="space-between">
                <ReviewRating isHalf rating={overallRating} size={20} />
                <Button>Read More</Button>
              </Flex>
            </Flex>
          ) : !showReviewSnippet ? (
            <Flex direction="column" minH="120px" justify="space-between">
              <Text lineClamp={3}>{description}</Text>
              <Flex
                direction="row"
                py="4"
                justify="space-between"
                align="center"
              >
                <Flex direction="column" gap="2">
                  <ReviewRating isHalf rating={overallRating || 0} size={20} />
                  <Text fontSize="sm">
                    {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
                  </Text>
                </Flex>
                <Button>Explore</Button>
              </Flex>
            </Flex>
          ) : (
            <Flex direction="row" justify="right">
              <Button>Leave a Review</Button>
            </Flex>
          )}
        </Flex>
      </Link>
    </Box>
  );
}
