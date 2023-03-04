import { User } from '@prisma/client';
import { useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

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
}

const Post = ({ post }: { post: Post }) => {
  return <></>;
};

const PostFeed = () => {
  const [posts, setPosts] = useState<Post[]>([] as Post[]);
  return <Virtuoso style={{ height: '80vh' }} data={posts} itemContent={(index, data: Post) => <Post post={data} />} />;
};

export default PostFeed;
