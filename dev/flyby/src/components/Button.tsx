import { Button, type ButtonProps } from '@chakra-ui/react';

const ThemeButton = ({ children, ...props }: ButtonProps) => (
  <Button
    bg="brand.400"
    _hover={{ bg: 'brand.300' }}
    _focus={{ bg: 'brand.300' }}
    _disabled={{ bg: 'brand.200', cursor: 'not-allowed' }}
    color="brand.white"
    {...props}
  >
    {children}
  </Button>
);

export default ThemeButton;
