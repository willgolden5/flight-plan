import styles from './index.module.css';
import { type NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';

import { api } from 'flight-plan/utils/api';
import Layout from 'flight-plan/components/Layout';
import { Flex, FormControl, FormLabel } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <Layout>
      <Flex backgroundColor='gray.200' w='375px' h='500px'>
        <Flex>
          <FormControl>
            <FormLabel>Email</FormLabel>
          </FormControl>
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
