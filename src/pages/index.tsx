import styles from './index.module.css';
import { type NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { api } from 'flight-plan/utils/api';
import Layout from 'flight-plan/components/Layout';
import {
  Button,
  Flex,
  Heading,
  Text,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';
import { ArrowRightIcon, ArrowDownIcon, CheckIcon } from '@chakra-ui/icons';
import LottiePlane from 'flight-plan/components/LottiePlane';
import SignUp from 'flight-plan/components/SignUpModal';
import { useEffect, useState } from 'react';

type AlphaData = {
  data: { email: string; first: string; last: string };
};

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [alphaData, setAlphaData] = useState<AlphaData>({
    data: {
      email: '',
      first: '',
      last: '',
    },
  } as AlphaData);
  const query = api.alpha.alpha.useQuery({
    email: alphaData.data.email,
    first: alphaData.data.first,
    last: alphaData.data.last,
  });

  const signIn = (email: string, first: string, last: string) =>
    setAlphaData({ data: { email, first, last } } as AlphaData);

  const submit = () => {
    if (query.error) {
      toast({
        title: 'Error',
        description: 'There was an error submitting your information. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    } else {
      toast({
        title: 'Success',
        description: 'You have successfully signed up for Flight Plan Alpha!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };
  return (
    <Layout>
      <Flex direction='column' w='375px' justify={'center'} align='center'>
        <Flex p={2} mb={2} direction='column'>
          <Heading size='2xl' fontWeight='900'>
            Flight Plan
          </Heading>
        </Flex>
        <LottiePlane />
        <Flex w='100%' h='full' justify='center' align='center'>
          {/* <Button leftIcon={<ArrowDownIcon h={4} />} colorScheme='facebook' w='45%' m={2} px={5} py={2}>
            Sign In
          </Button> */}
          <Button
            onClick={onOpen}
            // variant='outline'
            rightIcon={<ArrowRightIcon w={2} />}
            colorScheme='facebook'
            w='100%'
            m={2}
          >
            Join Waitlist
          </Button>
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize='26px' fontWeight='800'>
                Sign Up
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody justifyContent='center'>
                Leave your information below for access to the Flight Plan Closed Alpha.
              </ModalBody>
              <Flex p={4}>
                <SignUp dataAction={signIn} />
              </Flex>
              <ModalFooter w='100%'>
                <Button
                  onClick={() => {
                    submit();
                    onClose();
                  }}
                  leftIcon={<CheckIcon h={4} />}
                  colorScheme='facebook'
                  w='100%'
                  mr={2}
                  px={5}
                >
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
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
