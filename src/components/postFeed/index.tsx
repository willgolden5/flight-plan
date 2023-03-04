import { Avatar, Box, Card, CardBody, Flex, Heading, Text } from '@chakra-ui/react';
import { User } from '@prisma/client';
import { useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

const PostStatus = {
  LOOKING: 'LOOKING',
  MATCHED: 'MATCHED',
  INFLIGHT: 'INFLIGHT',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
} as const;

interface Comment {
  id: number;
  body: string;
  date: string;
  author: User;
}

interface Post {
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

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card>
      <CardBody>
        <Flex direction='column' align='center' justify='center'>
          <Flex direction='row' align='center' justify='center' id='user-data'>
            <Flex direction='row' align='center' justify='center' id='user-info'>
              <Flex direction='column' align='center' justify='center' id='user-avatar'>
                <Avatar size='md' name={post.author.name ? post.author.name : ''} />
              </Flex>
              <Flex direction='column' align='center' justify='center' id='user-name'>
                <Heading size='md' fontWeight='900'>
                  {post.author.name}
                </Heading>
                <Text>Certificate Type: {post.authorMetaData.certificate}</Text>
                <Text>Pilot Ratings: {post.authorMetaData.ratings}</Text>
              </Flex>
              <Flex direction='column' align='center' justify='center' id='user-name'>
                <Box w='100px' h='100px' border='1px solid black'>
                  MAP HERE
                </Box>
              </Flex>
            </Flex>
          </Flex>
          <Flex direction='row' align='center' justify='center' id='post-details'>
            <Flex direction='column' align='center' justify='center' id='post-body'>
              <Heading>{post.title}</Heading>
              <Text>{post.body}</Text>
            </Flex>
          </Flex>
          <Flex direction='row' align='center' justify='center' id='post-actions'>
            <Flex direction='column' align='center' justify='center' id='post-actions'>
              <Text>Status:</Text>
              <Text>{post.status}</Text>
            </Flex>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

const PostFeed = () => {
  const [posts, setPosts] = useState<Post[]>([] as Post[]);
  return (
    <Virtuoso
      style={{ height: '80vh', width: '100%' }}
      data={posts}
      itemContent={(_, data: Post) => <PostCard post={data} />}
    />
  );
};

export default PostFeed;
