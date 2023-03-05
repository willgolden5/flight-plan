import { Avatar, Box, Card, CardBody, Flex, Heading, Text } from '@chakra-ui/react';
import { Posts, User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { api } from 'flight-plan/utils/api';
import { useSession } from 'next-auth/react';

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
  return (
    <Card>
      <CardBody>
        <Flex direction='column' align='center' justify='center'>
          <Flex direction='row' align='center' justify='center' id='user-data'>
            <Flex direction='row' align='center' justify='center' id='user-info'>
              <Flex direction='column' align='center' justify='center' id='user-avatar'>
                <Avatar size='md' />
              </Flex>
              <Flex direction='column' align='center' justify='center' id='user-name'>
                <Heading size='md' fontWeight='900'>
                  {/* {post.author.name} */}Will Golden
                </Heading>
                <Text>Certificate Type: {post.certificate.map((cert) => cert)}</Text>
                <Text>Pilot Ratings: {post.ratings.map((rate) => rate)}</Text>
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
              <Text>{post.content}</Text>
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
  const { data, error } = api.post.all.useQuery();
  // const [posts, setPosts] = useState<Post[]>([] as Post[]);
  // const { data, status } = useSession({
  //   required: true,
  // });

  //   useEffect(() => {
  //     if (allposts.data) {
  //       // TODO: join post and pilot data to create a post
  //       setPosts(() => await postsToPost(allposts.data));
  //     }
  //   }, [allposts.data]);
  return (
    <Virtuoso
      style={{ height: '80vh', width: '700px' }}
      data={data}
      itemContent={(_: any, data: Posts) => <PostCard post={data} />}
    />
  );
};

export default PostFeed;
