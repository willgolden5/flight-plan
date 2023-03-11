import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { api } from 'flight-plan/utils/api';
import Layout from 'flight-plan/components/layout/Layout';
import {
  Button,
  Flex,
  Heading,
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
import { ArrowRightIcon, CheckIcon } from '@chakra-ui/icons';
import LottiePlane from 'flight-plan/components/LottiePlane';
import SignUp from 'flight-plan/components/SignUpModal';
import { useState } from 'react';
import PostViewer from 'flight-plan/components/PostViewer';
import AirmenAuthForm from 'flight-plan/components/AirmenAuthForm';

type AlphaData = {
  data: { email: string; first: string; last: string };
};

const Home: NextPage = () => {
  const { status, data } = useSession();
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
        description: 'You have successfully signed up for the Flight Plan Alpha!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  if (status !== 'authenticated') {
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
            <Button onClick={onOpen} rightIcon={<ArrowRightIcon w={2} />} colorScheme='facebook' w='100%' m={2}>
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
  }
  if (!data.user.isPilot) {
    return (
      <Layout>
        <AirmenAuthForm />
      </Layout>
    );
  }

  return (
    <Flex w='100%'>
      <Flex direction='column' w='100%' align='center' justify='center'>
        <PostViewer />
      </Flex>
    </Flex>
  );
};

export default Home;
