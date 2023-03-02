import styles from './index.module.css';
import { type NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';

import { api } from 'flight-plan/utils/api';
import Layout from 'flight-plan/components/Layout';
import { Button, Flex, FormControl, FormLabel, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';

const Home: NextPage = () => {

    return (
        <Layout>
            <Flex direction="column" w='375px' justify={"center"} align="center" >
              <Flex p={2}>
                <Heading>
                  Flight Plan Pre-Alpha
                </Heading>
              </Flex>
                <Flex w="100%" h="full" justify="center" align="center">
                    <Button colorScheme="cyan" w="33%" m={2}>Sign In</Button>
                  <Button colorScheme="gray" w="33%" m={2}>Sign Up</Button>
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
