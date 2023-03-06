import { CheckIcon } from '@chakra-ui/icons';
import {
  Flex,
  Heading,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
} from '@chakra-ui/react';
import { Posts } from '@prisma/client';
import { api } from 'flight-plan/utils/api';
import { useState } from 'react';
import PostFeed from './postFeed';

const PostViewer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [post, setPost] = useState({
    title: 'test',
    content: 'test',
    published: true,
    authorId: 'cleuf4b9t00023qmr84b2z339',
    certificate: ['1'],
    ratings: ['1'],
    status: '1',
  } as Posts);
  const create = api.post.create.useQuery({
    title: post.title,
    content: post.content,
    published: post.published,
    author: post.authorId,
    authorId: post.authorId,
    certificate: [...post.certificate],
    ratings: [...post.ratings],
    status: post.status,
  });
  const createPost = () => {
    console.log('create post');
    if (post.status.length > 3) {
      if (create.error) {
        console.log(create.error);
      } else {
        onClose();
        console.log(create.data);
      }
    }
  };
  return (
    <Flex p={2} mb={2} direction='column'>
      <Flex direction='row' w='100%' align='center' justify='space-between'>
        <Heading size='2xl' fontWeight='900'>
          Flight Plan
        </Heading>
        <Button onClick={onOpen} colorScheme='facebook'>
          Create Post
        </Button>
      </Flex>
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
            <form>
              <label>
                Title:
                <input value={`${post.title}`} onChange={(e) => setPost({ ...post, title: e.target.value })} />
              </label>
              <label>
                Content:
                <input value={`${post.content}`} onChange={(e) => setPost({ ...post, content: e.target.value })} />
              </label>
              <label>
                Status:
                <input value={`${post.status}`} onChange={(e) => setPost({ ...post, status: e.target.value })} />
              </label>
            </form>
          </Flex>
          <ModalFooter w='100%'>
            <Button onClick={createPost} leftIcon={<CheckIcon h={4} />} colorScheme='facebook' w='100%' mr={2} px={5}>
              Create Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <PostFeed />
    </Flex>
  );
};

export default PostViewer;
