import { Avatar, Button, Flex } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const NavBar = () => {
  const router = useRouter();
  const { status, data } = useSession();

  const login = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push('/sign-in');
  };
  return (
    <Flex position='fixed' dir='row' w='100%' h='100px' justify='space-between' p={2}>
      <Flex dir='row'></Flex>
      <Flex dir='row'></Flex>
      <Flex dir='row'>
        <Flex w='100%'>
          {status !== 'authenticated' ? (
            <Flex w='100%'>
              <Button
                borderColor='blackAlpha.900'
                variant='outline'
                colorScheme='facebook'
                m={2}
                w='100%'
                onClick={login}
              >
                Sign In / Sign Up
              </Button>
            </Flex>
          ) : (
            <Flex w='100%'>
              <Avatar name={data.user.name || ''} />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavBar;
