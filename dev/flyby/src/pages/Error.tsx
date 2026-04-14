import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface ErrorProps {
  children?: ReactNode;
  code?: string;
  error?: string | null;
}

export const Error = ({ children, code, error }: ErrorProps) => (
  <VStack gap="12">
    <VStack textAlign="center" gap="0">
      <Heading size="4xl">{code}</Heading>
      <Heading fontSize="3xl">Houston, something went wrong on our end</Heading>
      <Text>Please review the information below for more details.</Text>
    </VStack>
    {error && (
      <Box
        maxW="500px"
        p="6"
        border="2px"
        borderRadius="8px"
        borderColor="brand.light"
      >
        <Text color="brand.error">{error}</Text>
      </Box>
    )}
    {children}
  </VStack>
);
