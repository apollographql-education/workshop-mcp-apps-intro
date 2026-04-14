import ReviewRating from './ReviewRating';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface ReviewCardProps {
  comment: string | null;
  rating: number | null;
  location: {
    id: string;
    name: string;
  } | null;
}

export default function ReviewCard({
  rating,
  comment,
  location
}: ReviewCardProps) {
  const highlightStyles = {
    opacity: '80%',
    cursor: 'pointer'
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      color="brand.white"
      p="6"
      backgroundColor="brand.midnight"
      _hover={highlightStyles}
      _focus={highlightStyles}
      asChild
    >
      <Link to={`/location/${location?.id}`}>
        <Stack gap="32px" my="2" direction="column" justify="space-between">
          <ReviewRating isLight size={20} rating={rating} />
          <Heading size="xl">{location?.name}</Heading>
        </Stack>
        <Text lineClamp={3}>{comment}</Text>
      </Link>
    </Box>
  );
}
