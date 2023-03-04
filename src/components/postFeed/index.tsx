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
  title: string;
  body: string;
  location: string;
  date: string;
  comments: Comment[];
  status: typeof PostStatus[keyof typeof PostStatus];
}

const Post = ({ post }: { post: Post }) => {
  return <></>;
};

const PostFeed = () => {
  const [posts, setPosts] = useState<Post[]>([] as Post[]);
  return (
    <Virtuoso
      style={{ height: '80vh', width: '100%' }}
      data={posts}
      itemContent={(_, data: Post) => <Post post={data} />}
    />
  );
};

export default PostFeed;
