import { Flex } from '@chakra-ui/react';
import { type ReactNode } from 'react';
import NavBar from './Navbar';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Flex w='100vw' h='100vh' direction='column'>
      <NavBar />
      <Flex w='100%' h='100%' justify='center' align='center'>
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;
