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
  Select,
  Input,
} from '@chakra-ui/react';
import { Posts } from '@prisma/client';
import { api } from 'flight-plan/utils/api';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import PostFeed from './postFeed';

const PostViewer = () => {
  const { data } = useSession();
  const pilotCreds = api.alpha.getPilotCredentials.useQuery({ userId: data?.user.id || '' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const create = api.post.create.useMutation();

  const [post, setPost] = useState<Posts>({
    title: '',
    content: '',
    published: true,
    authorId: data?.user.id || '',
    certificate: [pilotCreds.data?.certificateNum || ''],
    ratings: [...(pilotCreds.data?.certificate.filter((cert) => typeof cert !== 'undefined') || '')],
    status: 'Open',
  } as Posts);
  const createPost = () => {
    create.mutate({
      title: post.title,
      content: post.content,
      published: post.published,
      authorId: post.authorId,
      certificate: post.certificate || [''],
      ratings: post.ratings,
      status: post.status,
      author: data?.user.name || '',
    });
  };

  useEffect(() => {
    console.log(pilotCreds.data, data);
  }, [pilotCreds.data]);
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
            New Flight Plan
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody justifyContent='center'>Create a new flight plan below:</ModalBody>
          <Flex p={4}>
            <form>
              <label>
                Title:
                <Input value={`${post.title}`} onChange={(e) => setPost({ ...post, title: e.target.value })} />
              </label>
              <label>
                Content:
                <Input value={`${post.content}`} onChange={(e) => setPost({ ...post, content: e.target.value })} />
              </label>
              <label>
                Flight Status:
                <Select value={`${post.status}`} onChange={(e) => setPost({ ...post, status: e.target.value })}>
                  <option value='open'>Open</option>
                  <option value='planned'>Planned</option>
                  <option value='pending'>Pending</option>
                  <option value='published'>Accepted</option>
                </Select>
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
