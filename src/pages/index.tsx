import styles from './index.module.css';
import { type NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { api } from 'flight-plan/utils/api';
import Layout from 'flight-plan/components/Layout';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { ArrowRightIcon, ArrowDownIcon } from '@chakra-ui/icons';
import LottiePlane from 'flight-plan/components/LottiePlane';

const Home: NextPage = () => {
  return (
    <Layout>
      <Flex direction='column' w='375px' justify={'center'} align='center'>
        <Flex p={2} mb={2}>
          <Heading>Flight Plan Pre-Alpha</Heading>
        </Flex>
        <LottiePlane />
        <Flex w='100%' h='full' justify='center' align='center'>
          <Button leftIcon={<ArrowDownIcon h={4} />} colorScheme='facebook' w='45%' m={2} px={5} py={2}>
            Sign In
          </Button>
          <Button variant='outline' rightIcon={<ArrowRightIcon w={2} />} colorScheme='facebook' w='45%' m={2}>
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className={styles.authContainer}>
      <p className={styles.showcaseText}>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button className={styles.loginButton} onClick={sessionData ? () => void signOut() : () => void signIn()}>
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  );
};
