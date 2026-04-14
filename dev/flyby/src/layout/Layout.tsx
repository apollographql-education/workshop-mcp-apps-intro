import Nav from '../components/Nav';
import { Container, type ContainerProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface LayoutProps {
  noNav?: boolean;
  children?: ReactNode;
  containerSize?: ContainerProps['maxW'];
}

export default function Layout({
  noNav,
  children,
  containerSize = 'container.xl'
}: LayoutProps) {
  return (
    <>
      {!noNav && <Nav />}
      <Container py="4" maxW={containerSize}>
        {children}
      </Container>
    </>
  );
}
