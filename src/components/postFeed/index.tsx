/* eslint-disable react/no-children-prop */
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { Posts, User } from '@prisma/client';
import { Virtuoso } from 'react-virtuoso';
import { api } from 'flight-plan/utils/api';
import { SearchIcon } from '@chakra-ui/icons';

export const PostStatus = {
  LOOKING: 'LOOKING',
  MATCHED: 'MATCHED',
  INFLIGHT: 'INFLIGHT',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
} as const;

export interface Comment {
  id: number;
  body: string;
  date: string;
  author: User;
}

export interface Post {
  id: number;
  author: User;
  authorMetaData: {
    certificate: string;
    ratings: string[];
  };
  title: string;
  body: string;
  location: string;
  date: string;
  comments: Comment[];
  status: typeof PostStatus[keyof typeof PostStatus];
}

const PostCard = ({ post }: { post: Posts }) => {
  const { data } = api.alpha.findUser.useQuery({ userId: post.authorId });

  if (!data) return null;
  return (
    <Card border='1px black solid' my={2}>
      <CardBody w='100%'>
        <Flex direction='column' align='center' justify='center' w='100%'>
          <Flex direction='row' align='center' justify='center' id='user-data' w='100%'>
            <Flex direction='row' justify='space-between' align='center' p={2} w='100%' id='user-info'>
              <Flex direction='column' align='center' justify='center' id='user-avatar'>
                <Avatar size='lg' />
                <Flex direction='column' align='left' w='100%' id='user-name'>
                  <Heading size='md' fontWeight='900'>
                    {data.name}
                  </Heading>
                  <Text>Type: {post.certificate.map((cert) => cert)}</Text>
                  <Text>Pilot Ratings: {post.ratings.map((rate) => rate)}</Text>
                  <Text>Status: {post.status}</Text>
                </Flex>
              </Flex>
              <Flex direction='row' align='flex-start' justify='center' h='100%' w='100%' id='post-details'>
                <Flex direction='column' align='center' justify='center' id='post-body'>
                  <Heading>{post.title}</Heading>
                  <Text>{post.content}</Text>
                </Flex>
              </Flex>
              <Flex direction='column' align='center' justify='center' id='user-name'>
                <Box w='275px' h='200px' border='1px solid black'>
                  MAP HERE
                </Box>
              </Flex>
            </Flex>
          </Flex>
          <Flex direction='row' align='center' justify='center' w='100%' id='post-actions' p={2}>
            <Button isDisabled colorScheme='facebook' w='100%' p={2}>
              Comment
            </Button>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

const PostFeed = () => {
  const { data } = api.post.all.useQuery();

  return (
    <Flex direction='column' h='100%' w='100%' justify='center' align='center'>
      <Flex direction='row' w='100%'>
        <InputGroup size='lg'>
          <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300' />} />
          <Input type='tel' placeholder='Flightplan search ...' />
        </InputGroup>
      </Flex>
      <Virtuoso
        useWindowScroll
        style={{ width: '750px' }}
        data={data}
        itemContent={(_: any, data: Posts) => <PostCard post={data} />}
      />
    </Flex>
  );
};

export default PostFeed;
